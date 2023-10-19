import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpeachToTextComponent } from './speach-to-text/speach-to-text.component';
import { SpeechToTextMainComponent } from './speech-to-text-main/speech-to-text-main.component';
import { VoiceWakeupComponent } from './voice-wakeup/voice-wakeup.component';
import { AnimatedAvatarComponent } from './animated-avatar/animated-avatar.component';
import { AzureAnimatedAvatarComponent } from './azure-animated-avatar/azure-animated-avatar.component';
import { ThreeAvatarComponent } from './three-avatar/three-avatar.component';
import { VoiceRecorderComponent } from './voice-recorder/voice-recorder.component';

const routes: Routes = [
  { path: '', redirectTo: 'speech-to-textv1', pathMatch: 'full' },
  { path: 'speech-to-textv1', component: SpeechToTextMainComponent },
  { path: 'speech-to-audio', component: VoiceRecorderComponent },
  { path: 'voice-wakeup', component: VoiceWakeupComponent },
  { path: 'avatar', component: AnimatedAvatarComponent },
  { path: 'azure-avatar', component: AzureAnimatedAvatarComponent },
  { path: 'three-avatar', component: ThreeAvatarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
