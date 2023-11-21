import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
declare var webkitRTCPeerConnection: any;
declare var mozRTCPeerConnection: any;
const RTCPeerConnection = (
  window.RTCPeerConnection ||
  webkitRTCPeerConnection ||
  mozRTCPeerConnection
).bind(window);

@Component({
  selector: 'app-streaming-avatar',
  templateUrl: './streaming-avatar.component.html',
  styleUrls: ['./streaming-avatar.component.scss']
})
export class StreamingAvatarComponent {
  @ViewChild('talkvideo', { static: false }) talkVideo!: ElementRef<any>
  connectionObj: any = {};
  statsIntervalId: any;
  videoIsPlaying: any;
  lastBytesReceived: any;
  peerConnection: RTCPeerConnection | undefined;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    setTimeout(() => {

      this.createConnection()
    },1000)
  }

  createConnection() {
    if (this.peerConnection && this.peerConnection.connectionState === 'connected') {
      return;
    }
    this.stopAllStreams();
    this.closePC();
    let sendObj = {
      source_url: 'https://vincifunstoqa.blob.core.windows.net/test/thumbnail.jpeg'
    }
    this.apiService.createConnection(sendObj).subscribe(async res => {
      console.log(res)
      if (res) {
        this.connectionObj = res;
        let ss = await this.createPeerConnection(this.connectionObj.offer, this.connectionObj.ice_servers);
        let sendObj = {
          answer: ss,
          session_id: this.connectionObj.session_id,
        }
        this.apiService.sdpTalkStream(sendObj, this.connectionObj.id).subscribe(async res => {
          console.log(res)
          if (res) {

          }
        })
      }
    }, err => {
      this.stopAllStreams();
      this.closePC();
    })
  }

  async createPeerConnection(offer: any, iceServers: any) {
    if (!this.peerConnection) {
      this.peerConnection = new RTCPeerConnection({ iceServers });
      console.log(this.peerConnection)
      // this.peerConnection.addEventListener('icegatheringstatechange', onIceGatheringStateChange, true);
      this.peerConnection.addEventListener('icecandidate', (event: RTCPeerConnectionIceEvent) => {
        this.onIceCandidate(event);
      }, true);
      this.peerConnection.addEventListener('iceconnectionstatechange', () => {
        this.onIceConnectionStateChange();
      }, true);
      // this.peerConnection.addEventListener('connectionstatechange', onIceConnectionStateChange, true);
      // this.peerConnection.addEventListener('signalingstatechange', onSignalingStateChange, true);
      this.peerConnection.addEventListener('track', (event: RTCTrackEvent) => {
        this.onTrack(event);
      }, true);
    }

    await this.peerConnection.setRemoteDescription(offer);
    console.log('set remote sdp OK');

    const sessionClientAnswer = await this.peerConnection.createAnswer();
    console.log('create local sdp OK');

    await this.peerConnection.setLocalDescription(sessionClientAnswer);
    console.log('set local sdp OK');

    return sessionClientAnswer;
  }

  onIceGatheringStateChange(peerConnection: RTCPeerConnection, ev: Event) {
    throw new Error('Function not implemented.');
  }

  onIceConnectionStateChange() {
    if (this.peerConnection?.iceConnectionState === 'failed' || this.peerConnection?.iceConnectionState === 'closed') {
      this.stopAllStreams();
      this.closePC();
    }
  }

  onSignalingStateChange(peerConnection: RTCPeerConnection, ev: Event) {
    throw new Error('Function not implemented.');
  }

  onIceCandidate(event: RTCPeerConnectionIceEvent) {
    console.log('onIceCandidate', event);
    if (event.candidate) {
      const { candidate, sdpMid, sdpMLineIndex } = event.candidate;
      // console.log(candidate,sdpMid, sdpMLineIndex);
      let sendObj = {
        candidate: candidate,
        sdpMid: sdpMid,
        sdpMLineIndex: sdpMLineIndex,
        session_id: this.connectionObj.session_id,
      }
      this.apiService.iceTalkStream(sendObj, this.connectionObj.id).subscribe(async res => {
        console.log(res)
        if (res) {

        }
      })
    }
  }

  onTrack(event: RTCTrackEvent) {
    if (!event.track) return;
    this.statsIntervalId = setInterval(async () => {
      const stats = await this.peerConnection?.getStats(event.track);
      stats?.forEach((report: any) => {
        if (report.type === 'inbound-rtp' && report.mediaType === 'video') {
          const videoStatusChanged = this.videoIsPlaying !== report.bytesReceived > this.lastBytesReceived;

          if (videoStatusChanged) {
            this.videoIsPlaying = report.bytesReceived > this.lastBytesReceived;
            this.onVideoStatusChange(this.videoIsPlaying, event.streams[0]);
          }
          this.lastBytesReceived = report.bytesReceived;
        }
      });
    }, 500);
  }

  onVideoStatusChange(videoIsPlaying: any, stream: any) {
    console.log(videoIsPlaying, stream)
    let status;
    if (videoIsPlaying) {
      status = 'streaming';
      const remoteStream = stream;
      this.setVideoElement(remoteStream);
    } else {
      status = 'empty';
      this.playIdleVideo();
    }
    // streamingStatusLabel.innerText = status;
    // streamingStatusLabel.className = 'streamingState-' + status;
  }

  playIdleVideo() {
    setTimeout(() => {
      console.log('playIdleVideo');
      console.log(this.talkVideo.nativeElement)
      this.talkVideo.nativeElement.srcObject = undefined;
      this.talkVideo.nativeElement.src = '../../assets/idle.mp4';
      this.talkVideo.nativeElement.loop = true;
    }, 500)
  }

  stopAllStreams() {
    if (this.talkVideo.nativeElement.srcObject) {
      console.log('stopping video streams');
      this.talkVideo.nativeElement.srcObject.getTracks().forEach((track: any) => track.stop());
      this.talkVideo.nativeElement.srcObject = null;
    }
  }

  closePC() {
    let pc = this.peerConnection;
    if (!pc) return;
    console.log('stopping peer connection');
    pc.close();
    pc.removeEventListener('icecandidate', (event: RTCPeerConnectionIceEvent) => {
      this.onIceCandidate(event);
    }, true);
    pc.removeEventListener('iceconnectionstatechange', () => {
      this.onIceConnectionStateChange();
    }, true);
    pc.removeEventListener('track', (event: RTCTrackEvent) => {
      this.onTrack(event);
    }, true);
    clearInterval(this.statsIntervalId);
    console.log('stopped peer connection');
    if (pc === this.peerConnection) {
      this.peerConnection = undefined;
    }
  }

  setVideoElement(stream: any) {
    if (!stream) return;
    this.talkVideo.nativeElement.srcObject = stream;
    this.talkVideo.nativeElement.loop = false;

    // safari hotfix
    if (this.talkVideo.nativeElement.paused) {
      this.talkVideo.nativeElement
        .play()
        .then((_res: any) => { })
        .catch((e: any) => { });
    }
  }

  talkAvatarStream() {
    let sendObj = {
      script: {
        type: 'text',
        input: `The input text that will be synthesized to an audio file.
        Note that each provider has its own limitations on the text length.
        audio duration is furhter limited in streaming to 01:30 minutes`
      },
      driver_url: 'bank://lively/',
      config: {
        stitch: true,
      },
      session_id: this.connectionObj.session_id,
    }
    this.apiService.avatarTalkStream(sendObj, this.connectionObj.id).subscribe(async res => {
      console.log(res)
      if (res) {

      }
    })
  }

}



