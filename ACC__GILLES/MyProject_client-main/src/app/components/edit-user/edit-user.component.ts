import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  //on définit les variables nécessaires :
  //form contiendra les valeurs entrées dans le formulaire
  form: any = {
    login: null,
    email: null,
    isAdmin: null,
  };
  //isSuccessful dira si la modification du user s'est bien déroulée
  isSuccessful = false;
  //isUpdateFailed dira si la modification a échoué
  isUpdateFailed = false;
  //errorMessage stockera un éventuel message d'erreur
  errorMessage = '';
  //id stockera l'id du user en cours de modification
  id: string = '';
  //user stockera les propriétés du user récupéré dans le back
  //!logiquement ces informations ne sont accessibles qu'à un admin. Cet accès limité est défini dans le back
  @Input() user?: User;
  

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  //au chargement on récupère l'id dans l'url et on lance la méthode getUser()
  ngOnInit(): void {
    this.id = String(this.route.snapshot.paramMap.get('id'));
    console.log(this.id);
    this.getUser(this.id);
  }

  //cette méthode permet de récupérer un user par son id grâce à UserService, et stocke les informations récupérées dans this.form
  public getUser(id: string) {
    this.userService.getUser(id).subscribe(user => {
      this.user = user;
      console.log('user', user, this.user)
      this.form._id = user._id;
      this.form.login = user.login;
      this.form.email = user.email;
      this.form.isAdmin = String(user.isAdmin);
    })
  }

  //quand le formulaire est soumis, on sollicite la méthode updateUser() de UserService à laquelle on donne en arguments les valeurs récupérées dans les champs login et isAdmin (booléen) du formulaire.
  //!on a choisi de pas autoriser la modification de l'email (voire explication dans UserService)
  onSubmit(): void {
    const { login, isAdmin } = this.form;
    
    this.userService.updateUser(this.id, login, isAdmin).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isUpdateFailed = false;
      },
      err => {
        console.error(err);
        this.errorMessage = err.error.message;
        this.isUpdateFailed = true;
      }
    )
  }

}
