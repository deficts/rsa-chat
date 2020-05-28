import { Component, OnInit, NgModule } from '@angular/core';
import {WebSocketService} from './web-socket.service';
import { RsaKeygenService } from "./rsa-keygen.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  nickname: string;
  message: string;
  messages: string[] = [];
  title = 'rsa-chat';
  myPrivateKey;
  myPublicKey;
  myN;
  friendPublicKey=65537;
  theirN;
  myID;

  constructor(private webSocketService: WebSocketService, private rsa: RsaKeygenService){}

  sendMessage(){
    var en= this.rsa.encode(this.message);
    var encrypted =this.rsa.encrypt(en,this.theirN,this.friendPublicKey);
    this.webSocketService.sendMessage(this.nickname,encrypted,this.myID);
    this.messages.push(this.nickname+": "+this.message);
    this.message='';
  }

  sendConnection(publicN){
    this.webSocketService.sendConnection(publicN);
  }

  ngOnInit() {
    const keygen = this.rsa.generate(256);
    this.myPublicKey = keygen.e;
    this.myPrivateKey = keygen.d;
    this.myN = keygen.n;
    this.webSocketService.getMessages().subscribe((obj) => {
      //descifrar mensaje
      //si yo lo mandé no los descifro
      if(obj.id!=this.myID){
        console.log(obj.id+" mio: "+this.myID);
        var decryptedMessage= this.rsa.decode(this.rsa.decrypt(obj.message,this.myPrivateKey,this.myN));
        console.log(decryptedMessage);
        this.messages.push(obj.nickname+": "+decryptedMessage);
      }
    });
    this.webSocketService.getPublicN().subscribe((publicN) => {
      for(let i of publicN){
        if(this.myN!=i){
          this.theirN = i;
          console.log(this.theirN);
        }
      }
    });
    this.webSocketService.getID().subscribe(id=>{
      if(this.myID==null){
        this.myID=id;
        console.log(id);
      }
    })
    console.log(this.myPrivateKey);
    console.log(this.myPublicKey);
    console.log(this.myN);
    this.sendConnection(this.myN);
  }
}
