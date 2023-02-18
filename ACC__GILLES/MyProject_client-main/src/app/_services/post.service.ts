import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../post'
import { Category } from '../category';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}
const POST_API = "http://localhost:4000/post/";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) { }

  // cette méthode récupère tous les posts
  getPosts(): Observable<Post[]> {
    const result = this.http.get<Post[]>(POST_API);
    return result;
  }

  // cette méthode récupère un post par son id
  getPostById(id: string): Observable<Post> {
    const post = this.http.get<Post>(POST_API + id);
    return post;
  }

  //cette méthode envoie une requête vers post/new avec un body qui contient un title, un content et un author. Le back reconnaitra l'url et si le token le permet, un post sera créé dans la bdd
  createPost(title: string, content: string, author: string, category: any[string]): Observable<Post> {
    return this.http.post<Post>(POST_API + "new", {title, content, author, category}, httpOptions);
  }

  //cette méthode envoie une requête vers post/update avec un body qui contient un title et un content. Le back reconnaitra l'url et si le token le permet, le post sera modifié dans la bdd avec ces nouvelles valeurs. On ne pourra pas modifier l'auteur avec cette méthode (c'est volontaire)
  updatePost(id: string, title: string, content: string, category: any[string]): Observable<Post> {
    return this.http.put<Post>(POST_API + "update/" + id, {title, content, category}, httpOptions);
  }

}
