import { Component } from '@angular/core';

@Component({
  selector: 'app-voice-recorder',
  templateUrl: './voice-recorder.component.html',
  styleUrls: ['./voice-recorder.component.scss']
})
export class VoiceRecorderComponent {
  audioUrl: any = '';
  mediaRecorder!: any;
  audioChunks: any[] = [];
  start() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.start();
      this.audioChunks = [];
      this.mediaRecorder.addEventListener("dataavailable", (event: any) => {
        this.audioChunks.push(event.data);
      });
      this.mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(this.audioChunks);
        console.log(audioBlob)
        this.audioUrl = URL.createObjectURL(audioBlob);
        var file = new File([this.audioUrl], "sample.wav", {lastModified: new Date().getTime()});
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
}
