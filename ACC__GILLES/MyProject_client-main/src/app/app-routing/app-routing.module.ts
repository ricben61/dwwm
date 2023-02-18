import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { CreatePostComponent } from '../components/create-post/create-post.component';
import { HomeComponent } from '../components/home/home.component';
import { SinglePostComponent } from '../components/single-post/single-post.component';
import { EditPostComponent } from '../components/edit-post/edit-post.component';
import { UserIndexComponent } from '../components/user-index/user-index.component';
import { EditUserComponent } from '../components/edit-user/edit-user.component';

//on met les différentes routes en place ici
const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "publish", component: CreatePostComponent },
  { path: "user-index", component: UserIndexComponent },
  { path: "post/:id", component: SinglePostComponent },
  { path: "edit/:id", component: EditPostComponent },
  { path: "edit-user/:id", component: EditUserComponent},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
