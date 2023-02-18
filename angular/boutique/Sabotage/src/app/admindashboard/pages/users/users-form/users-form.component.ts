import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { timer }from 'rxjs';
import * as countriesLib from 'i18n-iso-countries'

declare const require:any;
@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {

  form!: FormGroup;
  isSubmitted = false;
  isEditMode = false;
  currentUserId!: string;
  countries: any = [];

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initUserForm();
    this.checkEditMode();
    this.getCountries();
  }

  private getCountries(){
    countriesLib.registerLocale(require("i18n-iso-countries/langs/fr.json"));
   this.countries = Object.entries(countriesLib.getNames('fr', {select: 'official'})).map( entry =>{
      return {
        id: entry[0],
        name: entry[1]
      }
    })
  }

  private initUserForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: ['France']
    });
  }

  private addUser(user: User) {
    this.usersService.createUser(user).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: `L'utilisateur a bien été créé`
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "L'utilisateur n'a pas pu être créé!"
        });
      }
    );
  }

  private updateUser(user: User) {
    this.usersService.updateUser(user).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succes',
          detail: 'Utilisateur mise à jour!'
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Cet utilisateur n\'a pas pu être mis à jour!'
        });
      }
    );
  }

  private checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.currentUserId = params['id'];
        this.usersService.getUser(params['id']).subscribe((user:any) => {
          this.userForm['name'].setValue(user.name);
          this.userForm['email'].setValue(user.email);
          this.userForm['phone'].setValue(user.phone);
          this.userForm['isAdmin'].setValue(user.isAdmin);
          this.userForm['street'].setValue(user.street);
          this.userForm['apartment'].setValue(user.apartment);
          this.userForm['zip'].setValue(user.zip);
          this.userForm['city'].setValue(user.city);
          this.userForm['country'].setValue(user.country);

          this.userForm['password'].setValidators([]);
          this.userForm['password'].updateValueAndValidity();
        });
      }
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    // if (this.form.invalid) {
    //   return;
    // }
    const user: User = {
      id: this.currentUserId,
      name: this.userForm['name'].value,
      password:this.userForm['password'].value,
      email: this.userForm['email'].value,
      phone: this.userForm['phone'].value,
      isAdmin: this.userForm['isAdmin'].value,
      street: this.userForm['street'].value,
      apartment: this.userForm['apartment'].value,
      zip: this.userForm['zip'].value,
      city: this.userForm['city'].value,
      country: this.userForm['country'].value
    };
    if (this.isEditMode) {
      this.updateUser(user);
    } else {
      this.addUser(user);
    }
  }

  onCancel() {
    this.location.back();
  }

  get userForm() {
    return this.form.controls;
  }

}