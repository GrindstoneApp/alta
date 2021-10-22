import { Component, OnInit } from '@angular/core';
import { UserProvider } from 'src/providers/user.provider';
import { ModalService } from 'src/services/app-components/modal.service';

interface Profile {
  name?: string;
  pronouns?: string;
  biography?: string;
  location?: string;
  website?: string;
  showEmail?: boolean;
}

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
    name: "",
    pronouns: "",
    biography: "",
    location: "",
    website: "",
    showEmail: true
  }
  public oldProfileFormData: Profile = this.profileFormData;

  constructor(
    private modalService: ModalService,
    public user: UserProvider,
  ) { }

  ngOnInit() {
    this.profileFormData.name = this.user.get().name || "";
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

  preventEnterKey(e: any): void {
    if(e.keyCode === 13) e.preventDefault();
  }

  toggleShowEmail(e: any): void {
    this.profileFormData.showEmail = !this.profileFormData.showEmail;
  }

  saveProfileData(e: any): void {
    const elem = e.target;
    if(e.target.classList.contains('disabled')) return;
    this.saveButtonStatus = 'saving';
    setTimeout(() => {
      this.saveButtonStatus = 'disabled';
    }, 300);
  }

}
