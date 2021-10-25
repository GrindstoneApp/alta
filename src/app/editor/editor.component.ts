import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Portfolio, PortfolioProvider, Profile } from 'src/providers/portfolio.provider';
import { UserProvider } from 'src/providers/user.provider';
import { ModalService } from 'src/services/app-components/modal.service';
import { SessionService } from 'src/services/auth/session.service';
import { PortfolioService } from 'src/services/portfolio/portfolio.service';
import * as $ from 'jquery';
import { RequestService } from 'src/services/http/request.service';
import { environment } from 'src/environments/environment';
import { VideoComponent } from '../components/video/video.component';
import { PortfolioModulesService } from 'src/services/app-components/portfolio-modules.service';

type SaveButtonStatus = 'disabled' | 'active' | 'saving';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @ViewChild('modulesContainer', {read: ViewContainerRef}) modulesContainer?: ViewContainerRef;

  public accountMenuActive = false;
  public showVideoComp = false;
  public saveButtonStatus: SaveButtonStatus = 'disabled'
  public bioCharacterCount = 0;
  public numPortfolios = 0;
  public maxBioCharacterCount = 150;
  public profileFormData: Profile = {
    display_name: "",
    pronouns: "",
    bio: "",
    location: "",
    external_link: "",
    display_email: false,
  }
  public oldProfileFormData: Profile = this.profileFormData;
  public profileLink: string = "";
  public loadingModules: boolean = true;


  changes: boolean = false;

  constructor(
    private modalService: ModalService,
    private portfolioService: PortfolioService,
    public user: UserProvider,
    private video: VideoComponent,
    public portfolio: PortfolioProvider,
    private request: RequestService,
    private session: SessionService,
    private portfolioModulesService: PortfolioModulesService
  ) {}

  ngOnInit() {
    this.initializePortfolio();
  }

  async claimURL(): Promise<void> {
    try {
      const route: string = String($('#claim-url-input').val()).trim();
      const response: any = await this.request.get(`${environment.API_URL}/ptfl/check/route/${route}`, true)
      if(response.status === 202) {
        // Available
        const data = {
          portfolio_id: this.portfolio.get().id,
          url: route,
        }
        const claimRequest: any = await this.request.post(`${environment.API_URL}/ptfl/create/route`, data)
        this.session.initializePortfolio();
        window.alert('Successfully claimed this url.')
      } else {
        // Unavailable
        window.alert('This URL is already taken.')
      }
    } catch(err) {
      console.error(err)
    }
  }

  async initializePortfolio(): Promise<void> {
    try {
      await this.session.initializePortfolio();
      this.setData();
      this.openTutorialModal();
      console.log(this.portfolio.get())
    } catch(err: any) {
      if (err.error.errors && err.error.errors[0] === "user has no portfolios") {
        await this.portfolioService.create();
        // retry
        this.openTutorialModal();
        this.initializePortfolio();
      }
      console.error(err)
    }
  }

  avatarUploader(): void {
    $('#avatar-upload-input').click();
  }

  async avatarUploadInputChange(e: Event): Promise<void> {
    try {
      const element = e.currentTarget as HTMLInputElement;
      let fileList: FileList | null = element.files;
      if (fileList) {
        console.log("FileUpload -> files", fileList[0]);
        var formData = new FormData();
        formData.append('file', fileList[0], fileList[0].name);
        const response: any = await this.request.post(`${environment.API_URL}/ptfl/upload/avatar`, formData)
        console.log(response)
        this.user.setKey("profile_image_url", `https://user-content.grindstoneapp.com/profile_pictures/${this.user.get().id}.jpeg?timeStamp=${Date.now()}`)
      }
    } catch(err) {
      console.error(err)
    }
  }

  openAddModuleModal(): void {

    if ((this.portfolio.get().modules ? this.portfolio.get().modules.length : 0) >= 5) {
      window.alert("maximum modules reached")
    } else {
      this.modalService.open("add-module");
    }
  }

  addModules = (modules: Array<any>): void => {
    modules.forEach(m => {
      delete(m.data._id)
      delete(m.data.portfolio_id)
      delete(m.data.date_created)
      this.portfolioModulesService.addComponent(m.id, m.module_type.id, this.modulesContainer, {
        title: m.module_type.name,
        icon: m.module_type.icon,
        formData: m.data,
        removeCallback: this.removeComponent
      });
    });
    this.loadingModules = false;
  }

  addNewModule = async (id: any): Promise<void> => {
    this.loadingModules = true;
    const response = await this.portfolioService.addModule(id, this.portfolio.get().id);
    if(!response) return;
    setTimeout(async () => {
      await this.session.initializePortfolio();
      console.log(response);
      this.portfolioModulesService.addComponent(response.id, response.module_type.id, this.modulesContainer, {
        title: response.module_type.name,
        icon: response.module_type.icon,
        formData: {},
        removeCallback: this.removeComponent
      });
      this.loadingModules = false;
    }, 200);

  }

  removeComponent = async (id: number): Promise<void> => {
    const deleted = await this.portfolioService.deleteModule(id);
    if(!deleted) return;
    await this.session.initializePortfolio();
    this.portfolioModulesService.removeComponent(id, this.modulesContainer);
  }

  toggleAccountMenu(): void {
    this.accountMenuActive = !this.accountMenuActive
  }

  navigateToSupport(): void {
    this.accountMenuActive = false;
  }

  logout(): void {
    this.accountMenuActive = false;
    this.session.logout();
  }

  public setData(): void {
    const portfolio = this.portfolio.get()

    this.profileFormData = this.portfolio.get().profile;
    this.oldProfileFormData = this.profileFormData;
    if(portfolio.routes) {
      this.profileLink = portfolio.routes[portfolio.routes.length - 1]?.url || ""
    }
    if(portfolio.modules) {
      this.numPortfolios = portfolio.modules.length;
      this.addModules(portfolio.modules);
    } else {
      this.loadingModules = false;
    }
    console.log(this.profileLink)
    this.bioCharacterCount = this.profileFormData.bio?.length || 0;
    console.log(this.bioCharacterCount)
  }

  recordVideo(): void {
    var w = window.innerWidth;
    console.log(w);
    this.showVideoComp = true;
    setTimeout(() => {
      this.video.show();
    })
  }

  openTutorialModal(): void {
    this.accountMenuActive = false;
    this.modalService.open("tutorial");
  }

  openShareLinkModal(): void {
    this.accountMenuActive = false;
    this.modalService.open("share-link");
  }

  formInputFocused(e: any): void {
    const elem = e.target;
    const labelElem = elem.nextSibling;

    labelElem.classList.add('active');
  }

  formInputBlurred(e: any): void {
    const elem = e.target;
    const val = elem.value;
    const labelElem = elem.nextSibling;

    if(val.trim().length > 0) return;

    labelElem.classList.remove('active');
  }

  trackBioWordCount(e: any): void {
    const elem = e.target;
    const val = elem.value;
    elem.value = val.replace(/(\r\n|\n|\r)/gm, "")
    this.bioCharacterCount = val.length;
  }

  formKeyup(e: any): void {
    const elem = e.target;
    const dataTagID: keyof Profile= elem.getAttribute('data-profileKey');
    const val = elem.value;
    console.log(val, dataTagID)
    if(this.oldProfileFormData[dataTagID] !== val) {
      this.changes = true;
      this.saveButtonStatus = 'active';
    }
  }

  preventEnterKey(e: any): void {
    if(e.keyCode === 13) e.preventDefault();
  }

  toggleShowEmail(e: any): void {
    this.changes = true;
    this.saveButtonStatus = 'active';
    this.profileFormData.display_email = !this.profileFormData.display_email;
  }

  async saveProfileData(e: any): Promise<void> {
    try {
      const elem = e.target;
      if(e.target.classList.contains('disabled')) return;
      this.saveButtonStatus = 'saving';

      let data: any = {
        portfolio_id: this.portfolio.get().id,
        display_name: String($('#profile-name-input').val()).trim(),
        pronouns: String($('#profile-pronouns-input').val()).trim(),
        bio: String($('#profile-bio-input').val()),
        location: String($('#profile-location-input').val()).trim(),
        external_link: String($('#profile-website-input').val()).trim(),
        display_email: this.profileFormData.display_email
      }
      const response: Portfolio = await this.portfolioService.updateProfile(data);
      setTimeout(() => {
        this.saveButtonStatus = 'disabled';
      }, 500)
    } catch(err) {
      console.error(err)
    }
  }

}
