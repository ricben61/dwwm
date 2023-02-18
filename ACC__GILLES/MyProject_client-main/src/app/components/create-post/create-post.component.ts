import { Component, Input } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Category } from 'src/app/category';
import { CategoryService } from 'src/app/_services/category.service';
import { AuthService } from '../../_services/auth.service';
import { PostService } from '../../_services/post.service';
import { TokenStorageService } from '../../_services/token-storage.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  constructor(private tokenStorage: TokenStorageService, private postService: PostService, private categoryService: CategoryService) {}
  //on définit les variables nécessaires :
  title: string = '';
  content: string = '';
  //category stockera les id des categories sélectionnées dans le formulaire
  category: any[string] = [];
  //admin dira si le user connecté a le statut admin
  admin = false;
  //isPublished dira si le post est publié ou non
  isPublished = false;
  //errorMessage stockera le message d'erreur éventuel
  errorMessage = '';
  //idUser stockera l'id du user connecté
  idUser = '';
  //author renseignera la propriété author du post qui sera créé
  author = '';
  //categories stockera les categories récupérées dans le back
  categories: Category[] = [];

  //au chargement du composant on vérifie si le user connecté a le statut admin grâce à son token, et on récupère l'id de celui-ci pour pouvoir renseigné la propriété author du post qui sera éventuellement créé.
  ngOnInit(): void {
    if(this.tokenStorage.getUser().admin) {
      this.admin = true;
      this.author = this.tokenStorage.getUser().userId;
      this.getCategories();
    }
    
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(data => this.categories = data);
  }

  //quand le formulaire est soumis, on sollicite la méthode createPost() de PostService à laquelle on donne en arguments les valeurs récupérées dans les champs title et content du formulaire. L'argument author est renseigné grâce à la propriété author du composant renseignée dans ngOnInit() (voire ci-dessus). Les categories sont recupérées dans le formulaire dans un tableau qui doit être filtré au préalable : la valeur '0' représente 'no category'
  onSubmit(form: NgForm): void {
    const result = form.value.category.filter((item: string) => item != '0');
    const { title, content } = form.value;
    console.log(form.value);
    this.postService.createPost(title, content, this.author, result).subscribe(
      data => {
        this.isPublished = true;
        window.location.href="";
      },
      err => {
        this.errorMessage = err.error.message;
        this.isPublished = false;
      }
    )
  }
}
