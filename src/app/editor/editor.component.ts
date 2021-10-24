import { Component, OnInit } from '@angular/core';
import { Portfolio, PortfolioProvider, Profile } from 'src/providers/portfolio.provider';
import { UserProvider } from 'src/providers/user.provider';
import { ModalService } from 'src/services/app-components/modal.service';
import { SessionService } from 'src/services/auth/session.service';
import { PortfolioService } from 'src/services/portfolio/portfolio.service';
import * as $ from 'jquery';

type SaveButtonStatus = 'disabled' | 'active' | 'saving';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {


  public saveButtonStatus: SaveButtonStatus = 'active'
  public bioCharacterCount = 0;
  public maxBioCharacterCount = 150;
  public profileFormData: Profile = {
    display_name: "",
    pronouns: "",
    bio: "",
    location: "",
    external_link: "",
    showEmail: true
  }
  public oldProfileFormData: Profile = this.profileFormData;

  constructor(
    private modalService: ModalService,
    private portfolioService: PortfolioService,
    public user: UserProvider,
    public portfolio: PortfolioProvider,
    private session: SessionService,
  ) { }

  ngOnInit() {

    this.initializePortfolio();

  }

  async initializePortfolio(): Promise<void> {
    try {
      await this.session.initializePortfolio();
      console.log(this.portfolio.get())
      this.setData();
      this.oldProfileFormData = this.profileFormData;
    } catch(err: any) { 
      if (err.error.errors && err.error.errors[0] === "user has no portfolios") {
        await this.portfolioService.create();
        // retry
        this.initializePortfolio();
      }
      console.error(err)
    }
  }

  setData(): void {
    this.profileFormData = this.portfolio.get().profile;
  }

  openTutorialModal(): void {
    this.modalService.open("tutorial");
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
    const dataTagID = elem.getAttribute('data-profileKey');
    const val = elem.value;
    console.log(val, dataTagID)
  }

  preventEnterKey(e: any): void {
    if(e.keyCode === 13) e.preventDefault();
  }

  toggleShowEmail(e: any): void {
    this.profileFormData.showEmail = !this.profileFormData.showEmail;
  }

  async saveProfileData(e: any): Promise<void> {
    try {
      const elem = e.target;
      if(e.target.classList.contains('disabled')) return;
      this.saveButtonStatus = 'saving';
      
      let data: any = {
        portfoliO_id: this.portfolio.get().id,
        display_name: String($('#profile-name-input').val()).trim(),
        pronouns: String($('#profile-pronouns-input').val()).trim(),
        bio: String($('#profile-bio-input').val()).trim(),
        location: String($('#profile-location-input').val()).trim(),
        external_link: String($('#profile-website-input').val()).trim(),
      }
      const response: Portfolio = await this.portfolioService.updateProfile(data);
      this.portfolio.set(response)
      this.setData();
      setTimeout(() => {
        this.saveButtonStatus = 'disabled';
      }, 500)
    } catch(err: any) {
      console.error(err)
    }
  }

}
