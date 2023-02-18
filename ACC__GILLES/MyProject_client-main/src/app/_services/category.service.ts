import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../category';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}
const CATEGORY_API = "http://localhost:4000/category/";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    const result = this.http.get<Category[]>(CATEGORY_API);
    return result;
  }

  getCategory(id: string): Observable<Category> {
    const result = this.http.get<Category>(CATEGORY_API + id);
    return result;
  }

  addPost(categoryId: string, postId: string): Observable<Category>{
    const result = this.http.put<Category>(CATEGORY_API + categoryId + '/addPost/' + postId, {postId}, httpOptions);
    return result;
  }

  removePost(categoryId: string, postId: string): Observable<Category>{
    const result = this.http.put<Category>(CATEGORY_API + categoryId + '/removePost/' + postId, {postId}, httpOptions);
    return result;
  }
}
