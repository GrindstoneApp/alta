
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
  doneRecording: boolean = false;

  timeLeft: number = 3
  showTimeLeft: boolean = false;
  showRecordControls: boolean = false;

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
      width: 1280,
      height: 720,
      fluid: false,
      plugins: {
          record: {
              audio: true,
              video: {
                  width: { min: 640, ideal: 1280, max: 1920 },
                  height: { min: 360, ideal: 720, max: 1080 }
              },
              videoBitRate: 7000,
              videoMimeType: "video/webm;codecs=H264",
              audioBufferSize: 16384,
              maxLength: 10,
              debug: true
          }
      }
  };
  }

  ngOnInit() {
  }

  beginButton(): void {
    $('.vjs-record').click()
  }

  recordButton(): void {
    this.showTimeLeft = true;
    setTimeout(() => {
      $('.puller').addClass('active')
    }, 300)
    const countdown = setInterval(() => {
      if (this.timeLeft === 2) {
        this.showRecordControls = true;
      }
      if (this.timeLeft === 1) {
        clearInterval(countdown)
        this.showTimeLeft = false;
        $(".vjs-record-button").click();
        setTimeout(() => {
          $('.record-control').addClass('active')
        }, 200)
      } else {
        this.timeLeft = this.timeLeft - 1
      }
    }, 1000)
  }

  stopRecord(): void {
    $('.puller').hide()
    $('.puller').removeClass('active')
    this.showRecordControls = false;
    $(".vjs-record-button").click();
    this.doneRecording = true;
  }

  playVideo(): void {
    $('.vjs-big-play-button').click();
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
      $('.puller').hide()
      $('.puller').removeClass('active')
      this.showRecordControls = false;
      this.doneRecording = true;
    });

    this.player.on('error', (element: any, error: any) => {
      console.warn(error);
    });

    this.player.on('deviceError', () => {
      console.error('device error:', this.player.deviceErrorCode);
    });

    this.beginButton();
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
      this.player = false;
    }
  }

}