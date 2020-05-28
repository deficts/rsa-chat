import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  socket: any;
  readonly uri: string ="http://localhost:3000"

  constructor() {
    this.socket = io(this.uri);
  }

  public getID=()=>{
    return Observable.create((observer) => {
      this.socket.on('send-id', (id) => {
          observer.next(id);
      });
    });
  }

  public sendMessage(nickname,message,id){
    this.socket.emit('new-message',nickname,message,id);
  }

  public sendConnection(publicN){
    this.socket.emit('new-user', publicN);
  }

  public getMessages = () => {
    return Observable.create((observer) => {
        this.socket.on('new-message', (obj) => {
            console.log(obj)
            observer.next(obj);
        });
    });
  }

  public getPublicN = () =>{
    return Observable.create((observer) => {
      this.socket.on('public-N', (publicN) => {
          observer.next(publicN);
      });
  });
  }
}
