import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpeachToTextComponent } from './speach-to-text/speach-to-text.component';
import { SpeachToTextV2Component } from './speach-to-text-v2/speach-to-text-v2.component';
import { SpeachToTextV3Component } from './speach-to-text-v3/speach-to-text-v3.component';
import { FormsModule } from '@angular/forms';
import { VoiceRecorderComponent } from './voice-recorder/voice-recorder.component';
import { AlexaComponent } from './alexa/alexa.component';
import { SettingsComponent } from './settings/settings.component';
import { BotComponent } from './bot/bot.component';
import { SpeechToTextMainComponent } from './speech-to-text-main/speech-to-text-main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VoiceWakeupComponent } from './voice-wakeup/voice-wakeup.component';
import { AnimatedAvatarComponent } from './animated-avatar/animated-avatar.component';
import { AzureAnimatedAvatarComponent } from './azure-animated-avatar/azure-animated-avatar.component';
import { HttpClientModule } from '@angular/common/http';
import { ThreeAvatarComponent } from './three-avatar/three-avatar.component';
import { StreamingAvatarComponent } from './streaming-avatar/streaming-avatar.component';
import { WebRtcComponent } from './web-rtc/web-rtc.component';

@NgModule({
  declarations: [
    AppComponent,
    SpeachToTextComponent,
    SpeachToTextV2Component,
    SpeachToTextV3Component,
    VoiceRecorderComponent,
    AlexaComponent,
    SettingsComponent,
    BotComponent,
    SpeechToTextMainComponent,
    VoiceWakeupComponent,
    AnimatedAvatarComponent,
    AzureAnimatedAvatarComponent,
    ThreeAvatarComponent,
    StreamingAvatarComponent,
    WebRtcComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
