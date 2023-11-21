import { Component } from '@angular/core';
import { ScreenCaptureService } from '../services/screen-capture.service';

@Component({
  selector: 'app-web-rtc',
  templateUrl: './web-rtc.component.html',
  styleUrls: ['./web-rtc.component.scss']
})
export class WebRtcComponent {
  imageUrl: any = '';
  constructor(private screenCaptureService: ScreenCaptureService) { }

  async startScreenCapture() {
    await this.screenCaptureService.startScreenCapture().then(() => {
      this.captureScreenshot();
    });
  }

  async captureScreenshot() {
    const screenshotBlob = await this.screenCaptureService.captureScreenshot();
    if (screenshotBlob) {
      // Handle the captured blob as needed, e.g., display it in an HTML image element
      let imageUrl = URL.createObjectURL(screenshotBlob);
      console.log('Screenshot Image URL:', imageUrl);
      this.imageUrl = imageUrl;
      var file = new File([imageUrl], `screenshot_${new Date().getTime()}.png`, { lastModified: new Date().getTime(), type: 'image/png' });
      console.log(file)
      this.screenCaptureService.stopScreenCapture();
    }
  }

  ngOnDestroy() {
    // Ensure that the screen capture stream is stopped when the component is destroyed
    this.screenCaptureService.stopScreenCapture();
  }
}
