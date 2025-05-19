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
  checked: boolean = true;

  ngOnInit(): void {
    this.primeng.ripple.set(true);
    if(this.checked){
        const html = document.querySelector("html");
        html?.classList.toggle("my-app-dark");
    }
  }

  toggleDarkMode(){
    const html = document.querySelector("html");
    html?.classList.toggle("my-app-dark");
  }

  amberSwitch = {
        handle: {
            borderRadius: '4px'
        },
        colorScheme: {
            light: {
                root: {
                    checkedBackground: '{amber.500}',
                    checkedHoverBackground: '{amber.600}',
                    borderRadius: '4px'
                },
                handle: {
                    checkedBackground: '{amber.50}',
                    checkedHoverBackground: '{amber.100}'
                }
            },
            dark: {
                root: {
                    checkedBackground: '{amber.400}',
                    checkedHoverBackground: '{amber.300}',
                    borderRadius: '4px'
                },
                handle: {
                    checkedBackground: '{amber.900}',
                    checkedHoverBackground: '{amber.800}'
                }
            }
        }
    };

}
