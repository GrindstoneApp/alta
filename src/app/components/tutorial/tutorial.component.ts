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
      title: "Lorem ipsum dolor sit amet",
      description: "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Netus et malesuada fames ac.",
      imageUrl: ""
    },
    {
      title: "At in tellus integer",
      description: "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Netus et malesuada fames ac.",
      imageUrl: ""
    },
    {
      title: "Lorem ipsum dolor sit amet",
      description: "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Netus et malesuada fames ac.",
      imageUrl: ""
    },
    {
      title: "At in tellus integer",
      description: "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Netus et malesuada fames ac.",
      imageUrl: ""
    },
    {
      title: "Lorem ipsum dolor sit amet",
      description: "consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus. Netus et malesuada fames ac.",
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
