import { Injectable, NgZone } from '@angular/core';

declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class SpeachToTextService {

  recognition = new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  isListening = false;
  public text = '';
  tempWords!: any;

  constructor(private ngZone: NgZone) {
    // this.recognition.onstart = () => { console.log('started'); }
    // this.recognition.onend = () => { console.log('ended'); }
    // this.recognition.onresult = (e: any) => { console.log('result', e); }
   }

  init() {
    this.ngZone.run(() => {
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';
      this.recognition.addEventListener('result', (e: any) => {
        const transcript = Array.from(e.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('');
        this.tempWords = transcript;
        console.log(transcript);
      });
    });
  }

  start() {
    this.ngZone.run(() => {
      this.isStoppedSpeechRecog = false
      this.recognition.start();
      this.isListening = true;
      console.log("Speech recognition started")
      this.recognition.addEventListener('end', (condition: any) => {
        if (this.isStoppedSpeechRecog) {
          this.recognition.stop();
          this.isListening = false;
          console.log("End speech recognition")
        } else {
          this.wordConcat();
          this.recognition.start();
        }
      });
    });
  }
  
  stop() {
    this.ngZone.run(() => {
      this.isStoppedSpeechRecog = true;
      this.recognition.continuous = false;
      this.isListening = false;
      this.wordConcat()
      this.recognition.stop();
      console.log("End speech recognition")
    });
  }

  wordConcat() {
    this.text = this.text + ' ' + this.tempWords;
    this.tempWords = '';
  }
}
