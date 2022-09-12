import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { SeriesComponent } from './components/series/series.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SeriesListComponent } from './components/series-list/series-list.component';
import { ServicesService } from './Services/services.service';
import { AppRoutingModule } from './app-routing.module';
import { Routes,RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {path: '',pathMatch:"full",redirectTo:"home" },
  {path:"home", component:HomeComponent},
  {path:"series", component:SeriesComponent}
  
];

@NgModule({
  declarations: [
    AppComponent,
    SeriesComponent,
    SeriesListComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent
    
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ServicesService],//on declare les nouveaux MANUELLEMENT ici
  bootstrap: [AppComponent]
})
export class AppModule { }
