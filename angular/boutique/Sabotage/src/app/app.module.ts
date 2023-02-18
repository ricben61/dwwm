import { NgModule,LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


//components

import { DashboardComponent } from './admindashboard/pages/dashboard/dashboard.component';
import { StructureComponent } from './admindashboard/pages/structure/structure.component';
import { SidebarComponent } from './admindashboard/components/sidebar/sidebar.component';
import { CategoriesComponent } from './admindashboard/pages/categories/categories.component'


import { CategoriesFormComponent } from './admindashboard/pages/categories/categories-form/categories-form.component';

//module
import {AccordionModule} from 'primeng/accordion';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations';
import{CardModule} from 'primeng/card'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{ToastModule} from 'primeng/toast';
import {ColorPickerModule} from 'primeng/colorpicker';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {InputSwitchModule} from 'primeng/inputswitch'
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
 import{TableModule} from 'primeng/table'
import {ToolbarModule} from 'primeng/toolbar'
import {EditorModule} from 'primeng/editor'
import { PaginatorModule } from 'primeng/paginator';
import{ButtonModule} from 'primeng/button'
import{TagModule} from 'primeng/tag'
import{InputMaskModule} from 'primeng/inputmask'


//Service
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductsComponent } from './admindashboard/pages/products/products.component';
import { ProductsFormComponent } from './admindashboard/pages/products/products-form/products-form.component';
import { UsersComponent } from './admindashboard/pages/users/users.component';
import { UsersFormComponent } from './admindashboard/pages/users/users-form/users-form.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StructureComponent,
    SidebarComponent,
    CategoriesComponent,
    CategoriesFormComponent,
    ProductsComponent,
    ProductsFormComponent,
    UsersComponent,
    UsersFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule,
    BrowserAnimationsModule,
    CardModule,
    ButtonModule,
    TableModule,
    ToolbarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    ConfirmDialogModule,
    ColorPickerModule,
    InputNumberModule,
    InputTextModule,
    InputSwitchModule,
    DropdownModule,
    EditorModule,
    PaginatorModule,
    TagModule,
    InputMaskModule
  ],
  providers: [MessageService,ConfirmationService,{provide:LOCALE_ID,useValue:'fr-FR'}],
  bootstrap: [AppComponent],

})
export class AppModule { 
  constructor(){
    registerLocaleData(fr.default)
  }
}
