
import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef
} from '@angular/core';

import videojs from 'video.js';
import * as Record from 'videojs-record/dist/videojs.record.js';
import * as $ from 'jquery';

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

  ngOnInit() {}

  beginButton(): void {
    $('.vjs-record .vjs-device-button.vjs-control').click()
  }

  ngAfterViewInit(): void {
    let el = 'recorder'
    this.player = videojs('recorder', this.config, () => {
      console.log('player ready! id:', el);
    });

    this.player.on('deviceReady', () => {
      console.log('device is ready!');
      this.deviceReady = true;
    });

    this.player.on('startRecord', () => {
      console.log('started recording!');
    });

    this.player.on('finishRecord', () => {
      console.log('finished recording: ', this.player.recordedData);
    });

    this.player.on('error', (element: any, error: any) => {
      console.warn(error);
    });

    this.player.on('deviceError', () => {
      console.error('device error:', this.player.deviceErrorCode);
    });
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
      this.player = false;
    }
  }

}