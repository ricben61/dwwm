import { HTTP_INTERCEPTORS, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private tokenStorage: TokenStorageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // on récupère une requête en cours d'acheminement,
        let authReq = req;

        // on récupère le token
        const token = this.tokenStorage.getToken();

        if(token  != null) {
            // on clone req et on ajoute dans le header "Authorization : Bearer hsdsdghjghj87hfdhgs"
            authReq = req.clone({ headers : req.headers.set("Authorization", 'Bearer ' + token)});
        }

        // l'intercepteur doit encore laisser la requête repartir (en principe vers le back)
        return next.handle(authReq);
    }
}

export const AuthInterceptorProviders = [
     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
]