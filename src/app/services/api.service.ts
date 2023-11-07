import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  createTalk(reqObj: any) {
    // aGFyaWtyaXNobmFtdW5nYXJhNjRAZ21haWwuY29t:qpFE9o8CVGZi6iT9Qbv0x
    let headers = new HttpHeaders().set('content-type', 'application/json'); // add anoth
    headers = headers.append('accept', 'application/json'); // add anoth
    headers = headers.append('authorization', `Basic dml0aWthbGFzYW50b3NoQGdtYWlsLmNvbQ:7JgeOcyQq9fG-64GWHpQ6`); // add a new header, creating a new object
    return this.http.post('https://api.d-id.com/talks', reqObj, { headers: headers }).pipe(map((res: any) => {
      return res;
    }))
  }

  getTalk(id: any) {
    let headers = new HttpHeaders().set('content-type', 'application/json'); // add anoth
    headers = headers.append('accept', 'application/json'); // add anoth
    headers = headers.append('authorization', 'Basic dml0aWthbGFzYW50b3NoQGdtYWlsLmNvbQ:7JgeOcyQq9fG-64GWHpQ6');
    return this.http.get(`https://api.d-id.com/talks/${id}`, { headers: headers }).pipe(map((res: any) => {
      return res;
    }))
  }

  getAllTalk() {
    let headers = new HttpHeaders().set('content-type', 'application/json'); // add anoth
    headers = headers.append('accept', 'application/json'); // add anoth
    headers = headers.append('authorization', 'Basic dml0aWthbGFzYW50b3NoQGdtYWlsLmNvbQ:7JgeOcyQq9fG-64GWHpQ6');
    return this.http.get(`https://api.d-id.com/talks`, { headers: headers }).pipe(map((res: any) => {
      return res;
    }))
  }

  createConnection(reqObj: any) {
    let headers = new HttpHeaders().set('content-type', 'application/json'); // add anoth
    headers = headers.append('accept', 'application/json'); // add anoth
    headers = headers.append('authorization', `Basic ${environment.key}`);
    return this.http.post(`${environment.url}/talks/streams`, reqObj, { headers: headers }).pipe(map((res: any) => {
      return res;
    }))
  }

  iceTalkStream(reqObj: any, id: any) {
    let headers = new HttpHeaders().set('content-type', 'application/json'); // add anoth
    headers = headers.append('accept', 'application/json'); // add anoth
    headers = headers.append('authorization', `Basic ${environment.key}`);
    return this.http.post(`${environment.url}/talks/streams/${id}/ice`, reqObj, { headers: headers }).pipe(map((res: any) => {
      return res;
    }))
  }

  sdpTalkStream(reqObj: any, id: any) {
    let headers = new HttpHeaders().set('content-type', 'application/json'); // add anoth
    headers = headers.append('accept', 'application/json'); // add anoth
    headers = headers.append('authorization', `Basic ${environment.key}`);
    return this.http.post(`${environment.url}/talks/streams/${id}/sdp`, reqObj, { headers: headers }).pipe(map((res: any) => {
      return res;
    }))
  }

  avatarTalkStream(reqObj: any, id: any) {
    let headers = new HttpHeaders().set('content-type', 'application/json'); // add anoth
    headers = headers.append('accept', 'application/json'); // add anoth
    headers = headers.append('authorization', `Basic ${environment.key}`);
    return this.http.post(`${environment.url}/talks/streams/${id}`, reqObj, { headers: headers }).pipe(map((res: any) => {
      return res;
    }))
  }
}
