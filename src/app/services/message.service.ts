import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  message = '';

  constructor() { }

  add(msg: string){
    this.message = msg;
    console.log(this.message);
  }

}
