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
  @ViewChild('talkvideo', {static: false}) talkVideo!: ElementRef<any>
  connectionObj: any = {};
  statsIntervalId: any;
  videoIsPlaying: any;
  lastBytesReceived: any;
  peerConnection: RTCPeerConnection | undefined;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.createConnection()
  }

  createConnection() {
    let sendObj = {
      source_url: 'https://naction.in/wp-content/uploads/2023/01/Palki-S-Upadhyay-.jpg'
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
      // this.peerConnection.addEventListener('iceconnectionstatechange', onIceConnectionStateChange, true);
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

  onIceConnectionStateChange(peerConnection: RTCPeerConnection, ev: Event) {
    throw new Error('Function not implemented.');
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
    }, 1000)
  }

  setVideoElement(stream: any) {
    if (!stream) return;
    this.talkVideo.nativeElement.srcObject = stream;
    this.talkVideo.nativeElement.loop = false;
  
    // safari hotfix
    if (this.talkVideo.nativeElement.paused) {
      this.talkVideo.nativeElement
        .play()
        .then((_res: any) => {})
        .catch((e: any) => {});
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



