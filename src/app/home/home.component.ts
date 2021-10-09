
import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef
} from '@angular/core';

import videojs from 'video.js';
import * as Record from 'videojs-record/dist/videojs.record.js';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  deviceReady: boolean = false;

  private config: any;
  private player: any; 
  private plugin: any;

  // constructor initializes our declared vars
  constructor(elementRef: ElementRef) {
    this.player = true;

    // save reference to plugin (so it initializes)
    this.plugin = Record;

    // video.js configuration
    this.config = {
      controls: true,
      bigPlayButton: true,
      width: 854,
      height: 480,
      fluid: false,
      plugins: {
          record: {
              audio: true,
              video: {
                  width: { min: 1920, ideal: 1920, max: 1920 },
                  height: { min: 1080, ideal: 1080, max: 1080 }
              },
              videoBitRate: 8000,
              videoMimeType: "video/webm;codecs=H264",
              audioBufferSize: 16384,
              maxLength: 10,
              debug: true
          }
      }
  };
  }

  ngOnInit() {
    setTimeout(() => {
      console.log("trigger ready");
      this.player.triggerReady()
    }, 2000)
  }

  // use ngAfterViewInit to make sure we initialize the videojs element
  // after the component template itself has been rendered
  ngAfterViewInit() {
    // ID with which to access the template's video element
    let el = 'recorder'

    // setup the player via the unique element ID
    this.player = videojs('recorder', this.config, () => {
      console.log('player ready! id:', el);
    });

    // device is ready
    this.player.on('deviceReady', () => {
      console.log('device is ready!');
      this.deviceReady = true;
    });

    // user clicked the record button and started recording
    this.player.on('startRecord', () => {
      console.log('started recording!');
    });

    // user completed recording and stream is available
    this.player.on('finishRecord', () => {
      // recordedData is a blob object containing the recorded data that
      // can be downloaded by the user, stored on server etc.
      console.log('finished recording: ', this.player.recordedData);
    });

    // error handling
    this.player.on('error', (element: any, error: any) => {
      console.warn(error);
    });

    this.player.on('deviceError', () => {
      console.error('device error:', this.player.deviceErrorCode);
    });
  }

  // use ngOnDestroy to detach event handlers and remove the player
  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
      this.player = false;
    }
  }

}