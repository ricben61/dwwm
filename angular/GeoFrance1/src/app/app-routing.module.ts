import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommuneComponent } from './components/commune/commune.component';
import { AccueilComponent } from './components/accueil/accueil.component';


const routes: Routes = [
  
  {path: "accueil", component:AccueilComponent},
  {path:"commune", component:CommuneComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
