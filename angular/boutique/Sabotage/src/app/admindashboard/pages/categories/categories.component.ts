import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Confirmation, ConfirmationService, MessageService } from 'primeng/api';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories:Category[] = [];
  

  constructor(private categoriesService : CategoriesService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private router: Router
              ) { }

  ngOnInit(): void {
this.getCategories();

  }

  deleteCategory(categoryId:string){

    this.confirmationService.confirm({
      message: 'voulez-vous vraiment supprimer cette catégorie?',
      header: 'Supprimer une catégorie',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.categoriesService.deleteCategory(categoryId).subscribe(
          () => {
            this.getCategories(),
            this.messageService.add({
              severity: "success",
              summary: "Succés",
              detail: "La categorie a bien été supprimée"
            })
            
            
          },
          () => {
            this.messageService.add({
              severity: "error",
              summary: "Erreur",
              detail: "La categorie n'a pu être supprimée"
            })
          }
        )
      },
      
  }); 
 
  

  }
  
  editCategory(categoryId: string){
    this.router.navigateByUrl('admin/categories/form/'+categoryId)

  }


private getCategories(){


  this.categoriesService.getcategories().subscribe(cats =>{
    this.categories = cats;
  })

}





}
