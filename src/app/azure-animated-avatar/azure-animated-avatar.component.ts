import { ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { SpeechConfig, SpeechRecognizer, AudioConfig, ResultReason } from 'microsoft-cognitiveservices-speech-sdk';
import { environment } from 'src/environments/environment.development';
import { AzureSpeechService } from '../services/azure-speech.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-azure-animated-avatar',
  templateUrl: './azure-animated-avatar.component.html',
  styleUrls: ['./azure-animated-avatar.component.scss']
})
export class AzureAnimatedAvatarComponent {
  @ViewChild('svg') svgElm!: ElementRef<any>;
  svg!: any;
  private recognizer!: SpeechRecognizer;
  public recognitionResult!: string;
  FemaleSpeakers: any[] = []
  selectedVal: any = '';
  selectedIndex: number = 0;
  textToSpeak = 'Hi! I am your virtual friend, how can i help you today.';
  // textToSpeak = '<p>\n This is a <a href="https://example.com">link</a> in the content.</p>';
  sentences = [
    'Hi! I am your virtual friend, how can i help you today?',
    "hello",
    "hakuna matata",
    "a friend in need is a friend in deed",
  ];
  avatar = [
    { name: 'Avatar1', icon: '../../assets/AvatarImages/1.png', sw: '500', sh: '500', width: '75.28', height: '71.75', x: '213.36', y: '221.25', opacity: '1' },
    { name: 'Avatar2', icon: '../../assets/AvatarImages/avatar.png', sw: '500', sh: '500', width: '134', height: '128', x: '183', y: '217', opacity: '0.5' },
    { name: 'Avatar3', icon: '../../assets/AvatarImages/avtar2.png', sw: '500', sh: '500', width: '134', height: '128', x: '174', y: '202', opacity: '0.5' },
    { name: 'Avatar4', icon: '../../assets/AvatarImages/model.svg', sw: '200', sh: '500', width: '58', height: '70', x: '52', y: '67', opacity: '1' },
    // { name: 'Avatar5', icon: '../../assets/AvatarImages/avatar.gif', sw: '200', sh: '500', width: '58', height: '70', x: '52', y: '67', opacity: '1' },
  ]

  constructor(public speechService: AzureSpeechService, private el: ElementRef, private renderer: Renderer2, private cdRef: ChangeDetectorRef, private apiService: ApiService) {
    this.speechService.initializeSpeechRecognizer();
  }

  ngOnInit(): void {
    this.speechService.getVoices().then((voices: any) => {
      console.log(voices);
      if (voices.privErrorDetails) {

      } else {
        this.FemaleSpeakers = voices.privVoices;
        this.selectedVal = this.FemaleSpeakers[0].privShortName;
        // this.startSpeek()
      }
    })
  }

  getAllTalks() {
    this.apiService.getAllTalk().subscribe(res => {
      console.log(res)
    })
  }

  createTalk() {
    let sendObj = {
      // https://create-images-results.d-id.com/api_docs/assets/noelle.jpeg
      source_url: "https://storage.prompt-hunt.workers.dev/clghpuxu1001kjy08rgcn3yfb.jpeg",
      script: {
        type: 'text',
        input: this.textToSpeak,
        subtitles: 'false',
        provider: { type: 'microsoft', voice_id: 'en-US-JennyNeural' },
        ssml: 'false'
      },
      config: { fluent: 'false', pad_audio: '0.0' }
    }
    this.apiService.createTalk(sendObj).subscribe(res => {
      console.log(res)
      if (res) {
        this.apiService.getTalk(res.id).subscribe(res => {
          console.log(res)
        })
      }
    }, err => {

    })
  }

  selectImg(item: any, index: number) {
    this.selectedIndex = index;
    let avatar_svg__c = this.svgElm.nativeElement.querySelector('#avatar_svg__c') as HTMLImageElement;
    let avatar_svg__d = this.svgElm.nativeElement.querySelector('#avatar_svg__d') as HTMLImageElement;
    if (avatar_svg__d) {
      this.svgElm.nativeElement.setAttribute("viewBox", `0 0 ${item.sw} ${item.sh}`);
      avatar_svg__c.setAttribute('xlink:href', `${item.icon}`);
      avatar_svg__c.setAttribute('width', `${item.sw}`);
      avatar_svg__c.setAttribute('height', `${item.sh}`);
      avatar_svg__d.style.opacity = item.opacity;
      avatar_svg__d.setAttribute('xlink:href', `../../assets/visemes/viseme_id_0.svg`);
      avatar_svg__d.setAttribute('width', `${item.width}`);
      avatar_svg__d.setAttribute('height', `${item.height}`);
      avatar_svg__d.setAttribute('x', `${item.x}`);
      avatar_svg__d.setAttribute('y', `${item.y}`);
    }
  }

  convertLinksToSSML(text: string): string {
    // Example: Convert <a href="https://example.com">link</a> to speech-friendly SSML
    return text.replace(/<a .*?href=['"](.*?)['"].*?>(.*?)<\/a>/gi, (match, url, linkText) => {
      return ` ${linkText} <s>${url}</s>`;
    });
  }

  startSpeek() {
    // let textToSpeak = this.sentences[Math.floor(Math.random() * this.sentences.length)];
    const ssml = `<speak version='1.0' xml:lang='en-US' xmlns='http://www.w3.org/2001/10/synthesis' xmlns:mstts='http://www.w3.org/2001/mstts'> \r\n \
    <voice name='${this.selectedVal}'> \r\n \
      <mstts:viseme type='redlips_front'/> \r\n \
      ${this.convertLinksToSSML(this.textToSpeak)} \r\n \
    </voice> \r\n \
  </speak>`;
    console.log(ssml)
    this.speechService.speak(ssml, this.svgElm.nativeElement, () => {
      console.log('end speech')
    });
    this.speechService.getVisemeIds();
  }

  startRecognition(): void {
    this.speechService.startRecognition();
  }

  ngAfterViewInit(): void {
    this.svg = this.svgElm.nativeElement;
    this.selectImg(this.avatar[0], 0);
    this.cdRef.detectChanges();

  }
}
