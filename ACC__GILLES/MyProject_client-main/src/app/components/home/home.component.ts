import { Component } from '@angular/core';
import { Post } from 'src/app/post';
import { PostService } from 'src/app/_services/post.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  //on définit ici les variables nécessaires
  //posts stockera tous les posts présents dans la bdd, récupérés depuis le back
  posts: Post[] = [];
  //loading dire si le chargement est en cours ou non
  loading: boolean = false;

  constructor(private postService: PostService) {}

  //au chargement, on lance getPosts()
  ngOnInit(): void {
    this.getPosts();
  }

  //cette méthode permet de récupérer les posts dans le back et les stocke dans this.posts
  public getPosts() {
    this.loading = true;
    this.postService.getPosts().subscribe(
      (response) => {
        console.log(response);
        this.posts = response;
      },
      (error) => {
        console.error('request failed with error');
        this.loading = false;
      }
    ), () => {
      console.log('Request Completed');
      this.loading = false;
    }
  }
}
