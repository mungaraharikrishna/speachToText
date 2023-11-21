import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScreenCaptureService {

  private mediaStream: MediaStream | null = null;
  constructor() { }


  async startScreenCapture(): Promise<void> {
    try {
      this.mediaStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    } catch (error) {
      console.error('Error starting screen capture:', error);
      throw error;
    }
  }

  async captureScreenshot(): Promise<any> {
    if (!this.mediaStream) {
      console.error('No screen capture stream available.');
      return null;
    }

    const videoTrack = this.mediaStream.getVideoTracks()[0];
    const imageCapture = new (window as any).ImageCapture(videoTrack);

    try {
      const bitmap = await imageCapture.grabFrame();
      const canvas = document.createElement('canvas');
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(bitmap, 0, 0);

        // Convert the canvas content to a Blob (image/png)
        return new Promise((resolve) => {
          canvas.toBlob((blob) => {
            resolve(blob);
          }, 'image/png');
        });
      }
    } catch (error) {
      console.error('Error capturing screenshot:', error);
      return null;
    }
  }

  stopScreenCapture() {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }
  }
}
