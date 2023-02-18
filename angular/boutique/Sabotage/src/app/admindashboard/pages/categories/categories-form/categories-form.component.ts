import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {

form!: FormGroup;
isSubmitted:boolean = false;
isEditmode:boolean = false;
currentCategoryId!:string;

  constructor( 
    private formBuilder: FormBuilder,
    private categoriesService:CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
    
    ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      //Je definis la valeur de défaut de mes imput
      name:['',Validators.required],
      icon:['',Validators.required],
      color:['#000']

    });
    this.checkEditMode();
   
  }
  onSubmit(){
    this.isSubmitted = true
    if(this.form.invalid){
      return;
    }
    const category: Category = {
      id: this.currentCategoryId,
    name: this.form.controls['name'].value,
    icon: this.form.controls['icon'].value,
    color: this.form.controls['color'].value
  }

  if(this.isEditmode){
   
    this.updateCategory(category);
  }else{
    this.creatCategory(category)
  }

  
  }

  get categoryForm(){
    return this.form.controls
  }

  private checkEditMode() {

    this.route.params.subscribe( (params) =>{
      if (params['id']){
        this.isEditmode = true;
        this.currentCategoryId = params['id']
        this.categoriesService.getOneCategory(params['id']).subscribe( category  => {
          this.categoryForm['name'].setValue(category.name);
          this.categoryForm['icon'].setValue(category.icon);
          this.categoryForm['color'].setValue(category.color);
        })
      }

    } )
  }

  private updateCategory(category: Category){
    this.categoriesService.updateCategory(category).subscribe(
      () => {
        this.messageService.add({
          severity: "success",
          summary: "Succés",
          detail: "La categorie a bien été mis à jour"
        })
        timer(2000).toPromise().then(
          () => {
            this.location.back();
          }
        )
      },
      () => {
        this.messageService.add({
          severity: "error",
          summary: "Erreur",
          detail: "La categorie n'a pu être mise à jour"
        })
      }
    )
  }
  private creatCategory(category: Category){
    this.categoriesService.creatCategory(category).subscribe(
      () => {
        this.messageService.add({
          severity: "success",
          summary: "Succés",
          detail: "La categorie a bien été créée"
        })
        timer(2000).toPromise().then(
          () => {
            this.location.back();
          }
        )
      },
      () => {
        this.messageService.add({
          severity: "error",
          summary: "Erreur",
          detail: "La categorie n'a pu être créée"
        })
      }
    )
  }
  


}
