import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/services/app-components/modal.service';

interface TutorialPage {
  title: string;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {

  public activeTutorialPage = 0;
  public tutorialPages: TutorialPage[] = [
    {
      title: "Welcome to Portfolios",
      description: "Grindstone Portfolios is our all new product built to showcase who you are as a person–not as 'just another worker.'",
      imageUrl: ""
    },
    {
      title: "An experience made for you",
      description: "Add up to 5 modules by clicking the \"+ Add Module\" button. Fully customize your portfolio to show only the things you care about.",
      imageUrl: ""
    },
    {
      title: "Cover the basics",
      description: "Complete your profile on the left side of the screen. Enter your Display Name, a short bio, location, pronouns and an external link.",
      imageUrl: ""
    },
    {
      title: "Build & Share",
      description: "After building your portfolio to match your needs, get a share link in the top right corner and jump start your future career!",
      imageUrl: ""
    },
    {
      title: "Ready, set, go!",
      description: "Ready to go? click done! and if you have any questions our dedicated team is here to answer your questions in the support center!",
      imageUrl: ""
    },
  ];

  

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    
  }

  closeCb = () => {
    console.log(this.activeTutorialPage);
    this.activeTutorialPage = 0;
  }

  close(): void {
    this.modalService.close("tutorial");
  }

  next() {
    if(this.activeTutorialPage === this.tutorialPages.length - 1) {
      this.close();
      return;
    }
    this.activeTutorialPage++;
  }

}
