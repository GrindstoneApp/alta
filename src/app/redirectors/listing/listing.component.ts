import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionService } from 'src/services/qas/actions.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  listingID: null | string = null;

  constructor(
    private route: ActivatedRoute,
    private qa: ActionService,
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.listingID = String(routeParams.get('listingID'));

    if (!this.listingID) {this.throwHome(); return;}

    this.initialize();
  }

  async initialize(): Promise<void> {
    try {
      this.goToDeeplink();
    } catch(err) { 
     
    }
  }

  goToDeeplink(): void {
    const mobile = this.qa.detectMob();
    if (mobile) {
      setTimeout(function () { window.location.href = "https://apps.apple.com/us/app/grindstone-student-jobs/id1504821305"; }, 25);
      window.location.href = `grindstone://app/view-job/?id=${this.listingID}&pageType=preview`;
    } else {
      window.location.href = 'https://grindstoneapp.com'
    }
  }

  throwHome(): void {
    const mobile = this.qa.detectMob();
    if (mobile) {
      setTimeout(function () { window.location.href = "https://apps.apple.com/us/app/grindstone-student-jobs/id1504821305"; }, 25);
      window.location.href = "grindstone://app/loading";
    } else {
      window.location.href = 'https://grindstoneapp.com'
    }
  }

}
