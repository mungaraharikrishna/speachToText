import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AzureSpeechService } from '../services/azure-speech.service';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-voice-recorder',
  templateUrl: './voice-recorder.component.html',
  styleUrls: ['./voice-recorder.component.scss']
})
export class VoiceRecorderComponent {
  @ViewChild('target', { static: true }) target!: ElementRef<any>;

  player: any;
  audioUrl: any = '';
  mediaRecorder!: any;
  audioChunks: any[] = [];

  constructor(public speechService: AzureSpeechService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    
  }

  start() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.start();
      this.audioChunks = [];
      this.mediaRecorder.addEventListener("dataavailable", (event: any) => {
        console.log(event)
        this.audioChunks.push(event.data);
      });
      this.mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(this.audioChunks);
        console.log(audioBlob)
        this.audioUrl = URL.createObjectURL(audioBlob);
        saveAs(this.audioUrl, 'sample.wav');
        var file = new File([this.audioUrl], "sample.wav", { lastModified: new Date().getTime(), type: 'audio/wav' });
        console.log(file)
        console.log(this.audioUrl)
      });
    });
  }

  stop() {
    this.mediaRecorder.stop();
    // const audio = new Audio(audioUrl);
    // audio.play();
  }

  arrayBufferToFile(arrayBuffer: ArrayBuffer, fileName: string, fileType: string): File {
    const blob = new Blob([arrayBuffer], { type: fileType });
    this.audioUrl = URL.createObjectURL(blob);
    saveAs(blob, fileName,);
    return new File([blob], fileName, { lastModified: new Date().getTime(), type: 'audio/wav' });
  }

  convertSpeechToAudio(): void {
    this.speechService.convertSpeechToAudio((audio) => {
      console.log('Audio data:', audio);

      // Usage example
      const arrayBuffer = audio // Your ArrayBuffer
      const fileName = "example.wav"; // Desired file name
      const fileType = "audio/wav"; // Mime type of the file

      const file = this.arrayBufferToFile(arrayBuffer, fileName, fileType);
      console.log(file)
    });
  }
}
