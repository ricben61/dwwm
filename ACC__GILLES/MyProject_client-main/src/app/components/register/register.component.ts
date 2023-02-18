import { Component } from '@angular/core';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  //on définit ici les variables nécessaires
  //form stockera les valeurs entrées dans les champs du formulaire
  form: any = {
    login: null,
    email: null,
    password: null,
  };
  //isSuccesFul dira si le register s'est bien déroulé
  isSuccessful = false;
  //isSignUpFailed dira si le register a échoué
  isSignupFailed = false;
  //errorMessage stockera un message d'erreur éventuel
  errorMessage = '';

  constructor(private authService: AuthService) {}

  //quand on soumet le formulaire, une requête est envoyée vers le back, grâce à AuthService : le body de cette requête contient un login, un email et un password. Si le back prend l'inscription, il retournera un message dans ce sens, sinon, un message d'erreur.
  onSubmit(): void {
    const { login, email, password } = this.form;
    this.authService.register(login, email, password).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignupFailed = false;
        //on redirige ver "login" si l'inscription s'est bien passée
        window.location.href = "login";
      },
      err => {
        console.error(err);
        this.errorMessage = err.error.message;
        this.isSignupFailed = true;
      }
    )
  }

}
