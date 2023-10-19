import { Component, ElementRef, VERSION, ViewChild } from '@angular/core';
declare var webkitSpeechRecognition: any
@Component({
  selector: 'app-alexa',
  templateUrl: './alexa.component.html',
  styleUrls: ['./alexa.component.scss']
})
export class AlexaComponent {
  name = "Angular " + VERSION.major;
  @ViewChild("gSearch") formSearch!: ElementRef<any>;
  @ViewChild("searchKey") hiddenSearchHandler!: ElementRef<any>;
  url: any;
  synth = window.speechSynthesis;
  text: any;
  ngOnInit() {
    
  }
  public textToSpeech() {
    //   var msg = new SpeechSynthesisUtterance();
    // var voices = window.speechSynthesis.getVoices();
    // msg.voice = voices[10]; // Note: some voices don't support altering params
    // msg.voiceURI = 'native';
    // msg.volume = 1; // 0 to 1
    // msg.rate = 1; // 0.1 to 10
    // msg.pitch = 2; //0 to 2
    // msg.text = 'Hello World';
    // msg.lang = 'en-US';

    // msg.onend = function(e) {
    //   console.log('Finished in ' + event.elapsedTime + ' seconds.');
    // };

    //speechSynthesis.speak(msg);
    if ("speechSynthesis" in window) {
      console.log("Your browser supports speech synthesis.");
      // speak('hi');
    } else {
      alert(
        'Sorry your browser does not support speech synthesis. Try this in <a href="https://www.google.com/chrome/browser/desktop/index.html">Google Chrome</a>.'
      );
    }
  }

  public voiceSearch() {
    if (
      "webkitSpeechRecognition" in window ||
      "SpeechRecognition" in window ||
      "mozSpeechRecognition" in window ||
      "msSpeechRecognition" in window ||
      "oSpeechRecognition" in window
    ) {
      var dt = new Date();
      var current = dt.getUTCDay;
      console.log(current);
      console.log("Listening....");
      const vSearch = new webkitSpeechRecognition();
      vSearch.continous = false;
      vSearch.interimresults = false;
      vSearch.lang = "en-US";
      vSearch.start();

      const voiceHandler = this.hiddenSearchHandler.nativeElement;
      const formsearch = this.formSearch.nativeElement;
      vSearch.onresult = function (e: { results: { transcript: any; }[][]; }) {
        voiceHandler.value = e.results[0][0].transcript;
        // vSearch.stop();
        this.text = voiceHandler.value.toString();
        if (this.text.includes("Alexa")) {
          var msg = new SpeechSynthesisUtterance("yes how can i help you?");
          window.speechSynthesis.speak(msg);
        }
        if (this.text.includes("your name")) {
          var msg = new SpeechSynthesisUtterance("My name is Alexa");
          window.speechSynthesis.speak(msg);
        }
        if (this.text.includes("time")) {
          var msg = new SpeechSynthesisUtterance("current time is" + dt);
          window.speechSynthesis.speak(msg);
        }
        if (this.text.includes("search")) {
          var list = this.text.replace("can you search", " ");

          var msg = new SpeechSynthesisUtterance("Sure!! searching" + list);
          window.speechSynthesis.speak(msg);
          voiceHandler.value = list;


          formsearch.submit();
        }

        // var msg = new SpeechSynthesisUtterance(voiceHandler.value);
        // window.speechSynthesis.speak(msg);
        let elm = document.getElementById("text") as HTMLLIElement
        if (elm) {
          elm.innerText = voiceHandler.value;
        }

        console.log(voiceHandler.value);
      };
      vSearch.error = function (e: any) {
        console.log(e);
        vSearch.stop();
      };
    } else {
      console.log("speech recognization dosent support");
    }
  }

  ngAfterViewInit() {
    // this.voiceSearch();
  }
}
