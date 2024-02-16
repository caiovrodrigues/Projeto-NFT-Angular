import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { jwtDecode } from "jwt-decode";
import { Observable, catchError, of, throwError } from "rxjs";
import { IsLoggedService } from "../services/isLogged/is-logged.service";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";

@Injectable()
export class TokenInjectHttpInterceptor implements HttpInterceptor{

    private isLoggedService = inject(IsLoggedService);
    private router = inject(Router);
    private messageService = inject(MessageService);
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem("token");
        
        if(token){
            let decodedToken = jwtDecode(token);

            let isExpired = decodedToken && decodedToken.exp ? (decodedToken.exp < Date.now() / 1000) : false;

            if(isExpired){
                this.isLoggedService.removeCredentials();
                localStorage.removeItem("token");
            }else{
                req = req.clone({headers: req.headers.set("Authorization", "Bearer " + token)});
            }
        }
        
        return next.handle(req);
    }
    
}