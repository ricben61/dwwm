import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  deleteUser(userId: string) {
    this.confirmationService.confirm({
      message: 'Voulez vous vraiment supprimer cet utilisateur?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(userId).subscribe(
          () => {
            this.getUsers();
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Utilisateur bien supprimé'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Utilisateur n\'a pas pu être supprimé'
            });
          }
        );
      }
    });
  }

  updateUser(userid: string) {
    this.router.navigateByUrl(`/admin/utilisateurs/form/${userid}`);
  }

  private getUsers() {
    this.usersService.getUsers().subscribe((users:any) => {
      this.users = users;
    });
  }

}