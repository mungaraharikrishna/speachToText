import { Component, NgZone } from '@angular/core';
import alanBtn from "@alan-ai/alan-sdk-web";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'speachToText';
  alanBtnInstance: any;

  constructor() {
    // this.alanBtnInstance = alanBtn({
    //   key: '28b4365114e0f2f67d43485dbc3cb44a2e956eca572e1d8b807a3e2338fdd0dc/stage',
    // });
  }
  
}
