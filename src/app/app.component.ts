import { Component, OnInit, inject } from '@angular/core';
import { PrimeNG } from 'primeng/config';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit {
  
  private primeng = inject(PrimeNG);

  ngOnInit(): void {
    this.primeng.ripple.set(true);
  }

}
