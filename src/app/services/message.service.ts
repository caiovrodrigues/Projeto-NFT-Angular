import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  message = '';

  constructor(private router: Router) { }

  add(msg: string){
    this.message = msg;

    setTimeout(() => {
      this.router.navigate(['']);
    },100)


    setTimeout(() => {
      this.message = '';
    }, 4000);
    console.log(this.message);
  }

  close(){
    this.message = '';
  }

}
