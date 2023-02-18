import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService:MessageService

  ) { }

  ngOnInit(): void {
    this.getProducts();
  }
  
  editProduct(productId: string){
    this.router.navigateByUrl('admin/produits/form/'+productId)

  }
  
  deleteProduct(productId:string){

    this.confirmationService.confirm({
      message: 'voulez-vous vraiment supprimer ce produit?',
      header: 'Supprimer un produit',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.productsService.deleteProduct(productId).subscribe(
          () => {
            this.getProducts(),
            this.messageService.add({
              severity: "success",
              summary: "Succés",
              detail: "Le produit a bien été supprimée"
            })
            
            
          },
          () => {
            this.messageService.add({
              severity: "error",
              summary: "Erreur",
              detail: "Le produit n'a pu être supprimée"
            })
          }
        )
      },
      
  }); 
 
  

  }
  
private getProducts(){


  this.productsService.getcategories().subscribe(pdts =>{
    this.products = pdts;
  })

}
}
