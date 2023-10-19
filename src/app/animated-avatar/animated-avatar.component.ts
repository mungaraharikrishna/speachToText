import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-animated-avatar',
  templateUrl: './animated-avatar.component.html',
  styleUrls: ['./animated-avatar.component.scss']
})
export class AnimatedAvatarComponent {
  @ViewChild('avatarCanvas') canvas!: ElementRef<HTMLCanvasElement>
  textToSpeak = '';
  speaking = false;

  speak() {
    if (!this.textToSpeak || this.speaking) {
      return;
    }

    this.speaking = true;

    // Use the Web Speech API to speak the text
    const utterance = new SpeechSynthesisUtterance(this.textToSpeak);
    utterance.addEventListener('end', () => {
      this.speaking = false;
    });

    speechSynthesis.speak(utterance);

    // Animate the avatar while speaking
    this.animateAvatar();
  }

  animateAvatar() {
    // const canvas: HTMLCanvasElement = document.getElementById('avatarCanvas') as HTMLCanvasElement;
    const ctx: any = this.canvas.nativeElement.getContext('2d');

    const radius = 50;
    const centerX = this.canvas.nativeElement.width / 2;
    const centerY = this.canvas.nativeElement.height / 2;

    let angle = 0;

    const drawAvatar = () => {
      ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

      // Draw a simple animated circle
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      ctx.beginPath();
      ctx.arc(x, y, 20, 0, 2 * Math.PI);
      ctx.fillStyle = 'blue';
      ctx.fill();

      // Update the angle for animation
      angle += 0.1;

      if (this.speaking) {
        requestAnimationFrame(drawAvatar);
      }
    };

    drawAvatar();
  }




  // @ViewChild('textToSpeak') textToSpeak!: ElementRef<any> 
  // @ViewChild('avatarCanvas') canvas!: ElementRef<HTMLCanvasElement>
  // ctx!: any;
  // speaking: boolean = false
  // angle = 0;
  // radius!: number;
  // centerX!: number;
  // centerY!: number;
  // context!: any;

  // ngOnInit() {
  //   // this.canvas.nativeElement.getContext('2d')
  //   // this.drawAvatar();
  // }

  // speak() {
  //   const text = this.textToSpeak.nativeElement.value;
  //   if (!text || this.speaking) return;

  //   this.speaking = true;

  //   // Use the Web Speech API to speak the text
  //   const utterance = new SpeechSynthesisUtterance(text);
  //   utterance.addEventListener('end', () => {
  //     this.speaking = false;
  //   });

  //   speechSynthesis.speak(utterance);

  //   // Animate the avatar while speaking
  //   this.animateAvatar();
  // }

  // animateAvatar() {
  //   this.radius = 50;
  //   this.centerX = this.canvas.nativeElement.width / 2;
  //   this.centerY = this.canvas.nativeElement.height / 2;
  //   this.drawAvatar()
  // }

  // drawAvatar() {
  //   this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

  //   // Draw a simple animated circle
  //   const x = this.centerX + Math.cos(this.angle) * this.radius;
  //   const y = this.centerY + Math.sin(this.angle) * this.radius;

  //   this.context.beginPath();
  //   this.context.arc(x, y, 20, 0, 2 * Math.PI);
  //   this.context.fillStyle = 'blue';
  //   this.context.fill();

  //   // Update the angle for animation
  //   this.angle += 0.1;

  //   if (this.speaking) {
  //     requestAnimationFrame(this.drawAvatar);
  //   }
  // }

  // ngAfterViewInit(): void {
  //   this.context = this.canvas.nativeElement.getContext('2d');
  // }
}
