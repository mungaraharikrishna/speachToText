import { Injectable } from '@angular/core';
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';
import { environment } from 'src/environments/environment.development';

interface IMap {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class AzureSpeechService {
  viseme_id_0 = "../../assets/visemes/viseme_id_0.svg";
  viseme_id_1 = "../../assets/visemes/viseme_id_1.svg";
  viseme_id_2 = "../../assets/visemes/viseme_id_2.svg";
  viseme_id_3 = "../../assets/visemes/viseme_id_3.svg";
  viseme_id_4 = "../../assets/visemes/viseme_id_4.svg";
  viseme_id_5 = "../../assets/visemes/viseme_id_5.svg";
  viseme_id_6 = "../../assets/visemes/viseme_id_6.svg";
  viseme_id_7 = "../../assets/visemes/viseme_id_7.svg";
  viseme_id_8 = "../../assets/visemes/viseme_id_8.svg";
  viseme_id_9 = "../../assets/visemes/viseme_id_9.svg";
  viseme_id_10 = "../../assets/visemes/viseme_id_10.svg";
  viseme_id_11 = "../../assets/visemes/viseme_id_11.svg";
  viseme_id_12 = "../../assets/visemes/viseme_id_12.svg";
  viseme_id_13 = "../../assets/visemes/viseme_id_13.svg";
  viseme_id_14 = "../../assets/visemes/viseme_id_14.svg";
  viseme_id_15 = "../../assets/visemes/viseme_id_15.svg";
  viseme_id_16 = "../../assets/visemes/viseme_id_16.svg";
  viseme_id_17 = "../../assets/visemes/viseme_id_17.svg";
  viseme_id_18 = "../../assets/visemes/viseme_id_18.svg";
  viseme_id_19 = "../../assets/visemes/viseme_id_19.svg";
  viseme_id_20 = "../../assets/visemes/viseme_id_20.svg";
  viseme_id_21 = "../../assets/visemes/viseme_id_21.svg";
  speechConfig: SpeechSDK.SpeechConfig;
  recognizer!: SpeechSDK.SpeechRecognizer;
  synthesizer!: SpeechSDK.SpeechSynthesizer;
  visemes_arr: any[] = [];
  recognitionResult = ''
  visemeMap: IMap = {
    0: this.viseme_id_0,
    1: this.viseme_id_1,
    2: this.viseme_id_2,
    3: this.viseme_id_3,
    4: this.viseme_id_4,
    5: this.viseme_id_5,
    6: this.viseme_id_6,
    7: this.viseme_id_7,
    8: this.viseme_id_8,
    9: this.viseme_id_9,
    10: this.viseme_id_10,
    11: this.viseme_id_11,
    12: this.viseme_id_12,
    13: this.viseme_id_13,
    14: this.viseme_id_14,
    15: this.viseme_id_15,
    16: this.viseme_id_16,
    17: this.viseme_id_17,
    18: this.viseme_id_18,
    19: this.viseme_id_19,
    20: this.viseme_id_20,
    21: this.viseme_id_21,
  };
  constructor() {
    // Set up the Speech SDK configuration (replace with your own subscription key and region)
    this.speechConfig = SpeechSDK.SpeechConfig.fromSubscription(environment.SpeechKey, environment.SpeechRegion);
    this.synthesizer = new SpeechSDK.SpeechSynthesizer(this.speechConfig);
  }

  initializeSpeechRecognizer(): void {
    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    this.recognizer = new SpeechSDK.SpeechRecognizer(this.speechConfig, audioConfig);
  }

  startRecognition(): void {
    if (this.recognizer) {
      this.recognizer.recognizing = (sender, event) => {
        console.log('Recognizing:', event.result.text);
      };

      this.recognizer.recognized = (sender, event) => {
        if (event.result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
          console.log('Recognized Text:', event.result.text);
          this.recognitionResult = event.result.text
        } else {
          console.error('Speech recognition error:', event.result.errorDetails);
        }
      };

      this.recognizer.startContinuousRecognitionAsync();
    } else {
      console.error('Speech recognizer not initialized.');
    }
  }

  stopRecognition(): void {
    if (this.recognizer) {
      this.recognizer.stopContinuousRecognitionAsync(
        () => {
          console.log('Speech recognition stopped.');
        },
        (error) => {
          console.error('Error stopping speech recognition:', error);
        }
      );
    }
  }

  speak(text: string, svg: any, onSpeechEnd: () => void): void {

    // Set up synthesis options if needed
    // const ssml = SpeechSDK.SpeechSynthesisVoiceName.enUSJessieRUS;
    // const audioConfig = SpeechSDK.AudioConfig.fromDefaultSpeakerOutput();

    // Synthesize the text to speech
    this.synthesizer.speakSsmlAsync(text, (result: any) => {
      console.log(result)
      // if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
      //   console.log('Speech synthesis complete');
      // } else {
      //   console.error('Speech synthesis error:', result.errorDetails);
      // }
      if (result.errorDetails) {
        console.error(result.errorDetails);
      } else {
        let img = svg.querySelector('#avatar_svg__d') as HTMLImageElement;
        this.visemes_arr.forEach((e, index) => {
          var duration = e.audioOffset / 10000;
          if (index == (this.visemes_arr.length - 1) && e.visemeId != 0) { 
            e.privVisemeId = 0;
          }
          setTimeout(() => {
            img.setAttribute('xlink:href', `${this.visemeMap[e.visemeId]}`);
          }, duration);
        });
      }
      this.visemes_arr = [];
      this.speechConfig.close();
    }, (error: any) => {
      console.error('Speech synthesis failed:', error);
      this.visemes_arr = [];
      this.speechConfig.close();
    });
  }

  getVisemeIds() {
    this.synthesizer.visemeReceived = (s: any, e: any) => {
      console.log(
        "(Viseme), Audio offset: " +
        e.audioOffset / 10000 +
        "ms. Viseme ID: " +
        e.visemeId
      );
      this.visemes_arr.push(e);
      return this.visemes_arr;
    };
  }

  getVoices() {
    return this.synthesizer.getVoicesAsync('en-US')
  }

  parseDomFromString(html: any) {
    return new DOMParser().parseFromString(html, "text/xml").querySelector("svg");
  }
}
