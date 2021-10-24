import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';

import videojs from 'video.js';
import * as Record from 'videojs-record/dist/videojs.record.js';
import * as $ from 'jquery';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  deviceReady: boolean = false;
  doneRecording: boolean = false;

  lastTimestamp: string = ""
  duplicateTimestamps: number = 0;

  timeLeft: number = 3;
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
          timeSlice: 1000,
          video: {
            width: { min: 1280, ideal: 1920, max: 1920 },
            height: { min: 720, ideal: 1080, max: 1080 },
          },
          videoBitRate: 8000,
          videoMimeType: 'video/webm;codecs=H264',
          audioBufferSize: 16384,
          maxLength: 120,
          debug: true,
          
        },
      },
    };
  }

  ngOnInit() {}

  beginButton(): void {
    $('.vjs-record').click();
  }

  restartVideo(): void {
    // this.player.reset();
    this.timeLeft = 3;
    this.showRecordControls = true;
    $('.puller').show();
    this.doneRecording = false;
    $('.video-container .review-buttons').hide();
    $('.vjs-record').click();
  }

  done(): void {
    this.upload(this.player.recordedData);
  }

  recordButton(): void {
    $('.video-container .record-button').fadeOut(300);
    $('.video-container .darken').fadeOut(300);
    setTimeout(() => {
      this.showTimeLeft = true;
      setTimeout(() => {
        $('.puller').addClass('active');
      }, 300);
      const countdown = setInterval(() => {
        if (this.timeLeft === 2) {
          this.showRecordControls = true;
        }
        if (this.timeLeft === 1) {
          clearInterval(countdown);
          this.showTimeLeft = false;
          $('.vjs-record-button').click();
          setTimeout(() => {
            $('.record-control').addClass('active');
          }, 200);
        } else {
          this.timeLeft = this.timeLeft - 1;
        }
      }, 1000);
    }, 300);
  }

  stopRecord(): void {
    $('.puller').hide();
    $('.puller').removeClass('active');
    this.showRecordControls = false;
    $('.vjs-record-button').click();
    this.doneRecording = true;
  }

  playVideo(): void {
    $('.vjs-big-play-button').click();
    $('.video-container .review-buttons').hide();
    $('.video-container .darken').hide();
    const timeInterval = setInterval(() => {
      let time = $('.vjs-time-tooltip').text();
      let duration = $('.vjs-duration-display').text();
      console.log(time, duration);
      if (time === this.lastTimestamp) {
        this.duplicateTimestamps++;
      } else {
        this.duplicateTimestamps = 0;
      }
      this.lastTimestamp = time;
      if (this.duplicateTimestamps > 15) {
        clearInterval(timeInterval);
        console.log('ended due to duplicates');
        this.lastTimestamp = ""
        this.duplicateTimestamps = 0
        setTimeout(() => {
          this.playbackEnded();
        }, 500)
      }
      if (time === duration) {
        clearInterval(timeInterval);
        console.log('ended');
        this.lastTimestamp = ""
        this.duplicateTimestamps = 0
        setTimeout(() => {
          this.playbackEnded();
        }, 700)
      }
    }, 100);
  }

  upload(blob: any): void {
    // var serverUrl = `${environment.API_URL}/ptfl/upload/video`;
    var serverUrl = `http://localhost:8000/ptfl/upload/video`
    var formData = new FormData();
    formData.append('file', blob, blob.name);

    console.log('upload recording ' + blob.name + ' to ' + serverUrl);

    fetch(serverUrl, {
        method: 'POST',
        body: formData
    }).then(
        success => console.log('upload recording complete.')
    ).catch(
        error => console.error('an upload error occurred!')
    );
}

  playbackEnded(): void {
    $('.video-container .review-buttons').fadeIn(500);
    $('.video-container .darken').fadeIn(300);
  }

  ngAfterViewInit(): void {
    let el = 'recorder';
    this.player = videojs('recorder', this.config, () => {
      console.log('player ready! id:', el);
    });

    this.player.on('deviceReady', () => {
      console.log('device is ready!');
      this.deviceReady = true;
      $('.video-container .splash').fadeOut(300);
    });

    this.player.on('startRecord', () => {
      console.log('started recording!');
    });

    this.player.on('finishRecord', () => {
      console.log('finished recording: ', this.player.recordedData);
      $('.puller').hide();
      $('.puller').removeClass('active');
      this.showRecordControls = false;
      this.doneRecording = true;
      $('.video-container .darken').fadeIn(300);
      $('.video-container .review-buttons').fadeIn(500);
    });

    this.player.on('timestamp', (e: any) => {
      console.log(e);
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
