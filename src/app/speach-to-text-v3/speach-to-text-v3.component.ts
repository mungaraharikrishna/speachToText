import { Component } from '@angular/core';
import { SpeachToTextService } from '../services/speach-to-text.service';

@Component({
  selector: 'app-speach-to-text-v3',
  templateUrl: './speach-to-text-v3.component.html',
  styleUrls: ['./speach-to-text-v3.component.scss']
})
export class SpeachToTextV3Component {
  text = 'Welcome to text to speech example';
  pitch = 1;
  rate = 1;
  synth = window.speechSynthesis;
  voices: SpeechSynthesisVoice[] = [];
  selectedVoice!: SpeechSynthesisVoice | undefined;

  constructor(public service: SpeachToTextService) {}
  ngOnInit() {
    setTimeout(() => this.loadVoices(), 100);
  }

  loadVoices() {
    this.voices = this.synth.getVoices().filter((voice) => voice.lang.includes('en'));
    this.selectedVoice = this.voices.find((voice) => voice.name.includes('Microsoft'));
  }

  speak() {
    const utterThis: any = new SpeechSynthesisUtterance(this.service.text);
    utterThis.rate = this.rate;
    utterThis.pitch = this.pitch;
    utterThis.voice = this.selectedVoice;
    this.synth.speak(utterThis);
  }

  pause() {
    this.synth.pause();
  }
  
  resume() {
    this.synth.resume();
  }
  
  cancel() {
    this.synth.cancel();

  }
}
