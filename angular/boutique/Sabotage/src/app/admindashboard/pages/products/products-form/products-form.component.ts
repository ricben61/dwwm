import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit {
 isEditMode = false;
 form!: FormGroup;
 isSubmitted:boolean=false;
 categories: Category[] = [];
 imageDisplay!:any;
 currentProductId!:string


  constructor(
    private formBuilder: FormBuilder,
    private categoriesService:CategoriesService,
    private productsService: ProductsService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getCategories();
    this.checkEditMode()
   
  }

  onSubmit(){
    this.isSubmitted=true;

    const productFormData = new FormData();
     Object.keys(this.productForm).map((key)=>{
      // console.log(key);
        
      
      productFormData.append(key,this.productForm[key].value)
      
     })
     if(this.isEditMode){
      this.updateProduct(productFormData)

     }else{
       this.creatProduct(productFormData)
     }



    
  }

  get productForm(){
    return this.form.controls
  }

  imageUploaded(event:any){
    console.log(event);
   
    const file = event.target.files[0];
    if (file){
      this.form.patchValue({image:file})
      this.form.get('image')?.value
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
        }
      fileReader.readAsDataURL(file)
    }

  }





  private initForm(){
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured:[false]

    })
  }

  private getCategories(){


    this.categoriesService.getcategories().subscribe(cats =>{
      this.categories = cats;
    })
  
  }
  
  private creatProduct(productData:FormData){
    this.productsService.creatProduct(productData).subscribe(
      () => {
        this.messageService.add({
          severity: "success",
          summary: "Succés",
          detail: "Le produit a bien été créé"
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
          detail: "Le produit n'a pu être créé"
        })
      }
    )

  }

  private checkEditMode(){
    this.route.params.subscribe((params) =>{
      if(params['id']){ // L'id param dans le lien
        this.isEditMode = true;
        this.currentProductId = params['id']
        this.productsService.getOneProduct(params['id']).subscribe(product =>{
          this.productForm['name'].setValue(product.name);
          this.productForm['category'].setValue(product.category?.id);
          this.productForm['brand'].setValue(product.brand);
          this.productForm['price'].setValue(product.price);
          this.productForm['countInStock'].setValue(product.countInStock);
          this.productForm['isFeatured'].setValue(product.isFeatured);
          this.productForm['description'].setValue(product.description);
          this.productForm['richDescription'].setValue(product.richDescription);
          this.imageDisplay= product.image
        })
    }
  });
  }

  private updateProduct(productData:FormData){
    this.productsService.updateProduct(productData,this.currentProductId).subscribe(
      () => {
        this.messageService.add({
          severity: "success",
          summary: "Succés",
          detail: "Le produit a bien été modifié"
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
          detail: "Le produit n'a pu être modifié"
        })
      }
    )

  }

}
