import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesFormComponent } from './admindashboard/pages/categories/categories-form/categories-form.component';
import { CategoriesComponent } from './admindashboard/pages/categories/categories.component';
import { DashboardComponent } from './admindashboard/pages/dashboard/dashboard.component';
import { ProductsFormComponent } from './admindashboard/pages/products/products-form/products-form.component';
import { ProductsComponent } from './admindashboard/pages/products/products.component';
import { StructureComponent } from './admindashboard/pages/structure/structure.component';
import { UsersFormComponent } from './admindashboard/pages/users/users-form/users-form.component';
import { UsersComponent } from './admindashboard/pages/users/users.component';


const routes: Routes = [
  {
    path:"admin", 
    component: StructureComponent,
    children:[
      {
        path: 'Dashboard',
        component: DashboardComponent
      },{
        path: 'categories',
        component:CategoriesComponent
      },
      {
        path: 'categories/form',
        component: CategoriesFormComponent
      },
      {
        path: 'categories/form/:id',
        component:CategoriesFormComponent
      },{
        path: 'produits',
        component:ProductsComponent
      },
      {
        path: 'produits/form',
        component:ProductsFormComponent
      },
      {
        path: 'produits/form/:id',
        component:ProductsFormComponent
      },{
        path: 'utilisateurs',
        component:UsersComponent
      },
      {
        path: 'utilisateurs/form',
        component:UsersFormComponent
      },
      {
        path: 'utilisateurs/form/:id',
        component:UsersFormComponent
      }
      
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
