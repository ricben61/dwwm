import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
apiURLCategories = environment.apiURL + 'categories/'
  constructor( private http: HttpClient) { }

  getcategories(): Observable <Category[]>{

    return this.http.get<Category[]>(this.apiURLCategories)

  }
  getOneCategory(categoryId:string): Observable<Category>{
    return this.http.get<Category>(`${this.apiURLCategories}${categoryId}`)
  }


  creatCategory(category:Category):Observable<Category>{
    return this.http.post<Category>(this.apiURLCategories,category)

  }

  deleteCategory ( categoryId : string ): Observable<any>{
    return this.http.delete<Object>(`${this.apiURLCategories}${categoryId}`)
  }

  updateCategory (category: Category): Observable<Category>{
    return this.http.put<Category>(this.apiURLCategories + category.id,category)
  }

}
