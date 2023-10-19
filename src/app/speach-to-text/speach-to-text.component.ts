import { Component, OnInit, inject } from '@angular/core';
import { SpeachToTextService } from '../services/speach-to-text.service';

@Component({
  selector: 'app-speach-to-text',
  templateUrl: './speach-to-text.component.html',
  styleUrls: ['./speach-to-text.component.scss']
})
export class SpeachToTextComponent implements OnInit {
  text!: string;

  constructor(public service: SpeachToTextService) {
    this.service.init()
  }

  ngOnInit(): void {
    this.service.recognition.addEventListener('end', (condition: any) => {
      console.log("End speech recognition");
      // this.service.text = '';
      
    });
  }

  startService() {
    this.service.start()
  }

  stopService() {
    this.service.stop()
  }
}
