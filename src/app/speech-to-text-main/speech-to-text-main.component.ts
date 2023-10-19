import { Component, ElementRef, ViewChild } from '@angular/core';
import { SpeachToTextService } from '../services/speach-to-text.service';

@Component({
  selector: 'app-speech-to-text-main',
  templateUrl: './speech-to-text-main.component.html',
  styleUrls: ['./speech-to-text-main.component.scss'],
  host: { class: 'h-100' }
})
export class SpeechToTextMainComponent {
  @ViewChild('input', { read: ElementRef }) public textInput!: ElementRef<any>;
  history: any = [];
  isLoading: boolean = false;
  isListening: boolean = false;
  isReady: boolean = true;
  pitch = 1;
  rate = 1;
  synth = window.speechSynthesis;
  voices: SpeechSynthesisVoice[] = [];
  selectedVoice!: SpeechSynthesisVoice | undefined;

  constructor(public service: SpeachToTextService) {
    this.service.init()

  }

  ngOnInit() {
    setTimeout(() => {
      this.loadVoices();
      // this.toggleMic();
    }, 100);
    let initialMsg = 'Hi there! How can I assist you today?'
    this.history = [...this.history, { type: 'answer', message: initialMsg }];
    this.speak(initialMsg);

    this.service.recognition.addEventListener('end', (condition: any) => {
      this.service.recognition.continuous = false;
      // console.log(this.service.text)
      // if (this.service.text.toLowerCase().includes("alexa") || this.service.text.toLowerCase().includes("hey siri")) {
      //   this.cancel();
      //   this.speak('yes how can i help you?');
      //   this.stop();
      //   this.history = [...this.history, { type: 'question', message: 'yes how can i help you?' }];
      //   this.service.text = '';
      //   // this.speak('yes how can i help you?');
      //   // this.service.text = '';
      // }
      // console.log('called')
    });
    this.service.recognition.addEventListener('result', (condition: any) => {
      // setTimeout(() => {
      //   console.log(this.service.text)
      //   if (this.service.text.includes("Alexa") || this.service.text.toLowerCase().includes("hey siri")) {
      //     this.cancel();
      //     this.speak('yes how can i help you?');
      //     // this.stop();
      //     this.history = [...this.history, { type: 'answer', message: 'yes how can i help you?' }];
      //     this.service.text = '';
      //     this.service.recognition.continuous = false;
      //     this.isReady = true;
      //   }
        
      // }, 500);
      // console.log('called')
    });
    this.service.recognition.addEventListener('start', (condition: any) => {
      // setTimeout(() => {
      //   console.log(this.service.text)
      //   if (this.service.text.includes("Alexa") || this.service.text.toLowerCase().includes("hey siri")) {
      //     this.cancel();
      //     this.speak('yes how can i help you?');
      //     // this.stop();
      //     this.history = [...this.history, { type: 'answer', message: 'yes how can i help you?' }];
      //     this.service.text = '';
      //     this.service.recognition.continuous = false;
      //     this.isReady = true;
      //   }
        
      // }, 500);
      // console.log('called')
    });
  }

  loadVoices() {
    this.voices = this.synth.getVoices().filter((voice) => voice.lang.includes('en'));
    this.selectedVoice = this.voices.find((voice) => voice.name.includes('Google'));
  }

  speak(text: any) {
    const utterThis: any = new SpeechSynthesisUtterance(text);
    utterThis.rate = this.rate;
    utterThis.pitch = this.pitch;
    utterThis.voice = this.selectedVoice;
    this.synth.speak(utterThis);
    utterThis.addEventListener('end', (evt: any) => {
      this.service.text = '';
      this.textInput.nativeElement.value = '';
      this.textInput.nativeElement.focus();
      // this.isListening = true;
      // this.startService();
    })
  }

  onKeyup(e: any, input: any) {
    if (e.key == 'Enter') {
      e.preventDefault();
      let value: string = input.value.trim();
      if (value && value.length > 0) {
        this.cancel();
        // this.speak(input.value);
        this.stop();
        this.history = [...this.history, { type: 'question', message: input.value }];
        this.updateAnswers(input.value);
        input.value = '';
        this.service.text = '';
      }
    }
  }

  onClick(e: any, input: any) {
    let value: string = input.value.trim();
    if (value && value.length > 0) {
      this.cancel();
      // this.speak(input.value);
      this.stop();
      this.history = [...this.history, { type: 'question', message: input.value }];
      this.updateAnswers(input.value);
      input.value = '';
      this.service.text = '';
    }
  }

  updateAnswers(question: string) {
    let q = question.trim().toLowerCase();
    if (q.includes('robot')) {
      let obj: any = { type: 'answer', message: 'Yes, I am an AI-powered virtual assistant created by the Wallace Corporation.' }
      this.history = [...this.history, obj];
      this.speak(obj.message);
    } else if (q.includes('hello')) {
      let obj: any = { type: 'answer', message: 'Hello! How can I assist you today?' }
      this.history = [...this.history, obj];
      this.speak(obj.message);
    } else if (q.includes('your name')) {
      let obj: any = { type: 'answer', message: 'I am Joi, the virtual assistant designed by the Wallace Corporation. How can I assist you?' }
      this.history = [...this.history, obj];
      this.speak(obj.message);
    } else if (q.includes('time')) {
      let obj: any = { type: 'answer', message: `current time is ${new Date()}` }
      this.history = [...this.history, obj];
      this.speak(obj.message);
    }  else if (q.includes('age')) {
      let obj: any = { type: 'answer', message: `As an AI, I don't have an age. I exist to provide assistance and answer your questions.` }
      this.history = [...this.history, obj];
      this.speak(obj.message);
    } else if (q.includes('search') || q.includes('job') || q.includes('jobs')) {
      let obj: any = { type: 'answer', message: `Sure, searching`, link: `https://www.google.com/search?q=${this.history[this.history.length - 1].message}` }
      this.history = [...this.history, obj];
      this.speak(obj.message);
      setTimeout(() => {
        window.open(`https://www.google.com/search?q=${this.history[this.history.length - 2].message}`, '_blank');
      }, 1000);
    }
  }

  toggleMic() {
    if (this.isListening) {
      this.stopService();
    } else {
      this.startService();
    }
    this.isListening = !this.isListening;
  }

  startService() {
    this.service.start()
  }

  stopService() {
    this.service.stop()
  }

  cancel() {
    this.synth.cancel();
  }

  stop() {
    this.isListening = false
    this.stopService();
    setTimeout(() => {
      this.textInput.nativeElement.value = '';
      this.textInput.nativeElement.focus();
      this.service.recognition.addEventListener('end', (condition: any) => {
        this.stopService();
        this.service.stop();
      });
    }, 100);
  }
}
