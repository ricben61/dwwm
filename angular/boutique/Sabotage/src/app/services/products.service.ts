import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
apiURLProducts = environment.apiURL + 'products/'
  constructor( private http: HttpClient) { }

  getcategories(): Observable <Product[]>{

    return this.http.get<Product[]>(this.apiURLProducts)

  }
  getOneProduct(productId:string): Observable<Product>{
    return this.http.get<Product>(`${this.apiURLProducts}${productId}`)
  }


  creatProduct(productData:FormData):Observable<Product>{
   
    return this.http.post<Product>(this.apiURLProducts,productData)

  }

  deleteProduct ( productId : string ): Observable<any>{
    return this.http.delete<Object>(`${this.apiURLProducts}${productId}`)
  }

  updateProduct (productData: FormData, productId:string): Observable<Product>{
    return this.http.put<Product>(this.apiURLProducts + productId,productData)
  }

}
