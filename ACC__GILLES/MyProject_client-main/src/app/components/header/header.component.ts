import { Component } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  //on définit les variables nécessaires
  title:string = "Blog";
  //isLoggedIn stockera un booléen qui dira si un user est connecté ou non
  isLoggedIn: boolean = false;
  //admin dira si le user connecté est un admin
  admin: boolean = false;
  //user stockera le login du user connecté
  user: string = '';


  constructor(private tokenStorageService: TokenStorageService) {}

  //au chargement du composant, on renseigne les différentes variables définies plus haut
  ngOnInit(): void {
    if(this.tokenStorageService.getToken()){
      this.isLoggedIn = true;
      this.user = this.tokenStorageService.getUser().login;
    }

    if(this.tokenStorageService.getUser().admin) {
      this.admin = true;
    }
  }

  //la méthode logout permettra de se déconnecter et sera déclenchée en cliquant sur le lien correspondant
  logout(): void {
    this.tokenStorageService.signOut();
    this.isLoggedIn = false;
    window.location.reload();
  }

}
