import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { Usersearch } from 'src/app/classes/usersearch';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  retunedUser!: User;
  globalUserReturn!: any[];
  globalRepoReturn!: any[];
  isUsers: boolean = false;
  isRepositories: boolean = false;

  constructor(private apiCall: ApiServiceService) {}

  ngOnInit(): void {}

  getUser(userInput: string) {
    this.apiCall.userSearch(userInput).then(
      (success) => {
        this.retunedUser = this.apiCall.user;
        console.log(this.retunedUser);
      },
      (error) => {
        alert('User not found');
        console.log(error);
      }
    );
  }

  globalRepositorySearch(userInput: string) {
    this.apiCall.globalRepositorySearch(userInput).then(
      (success) => {
        this.globalRepoReturn = this.apiCall.repositories;
        this.isRepositories = true;
        console.log(this.globalRepoReturn);
      },
      (error) => {
        alert('Repository not found');
        console.log(error);
      }
    );
  }

  globalUserSearch(userInput: string) {
    this.apiCall.globalUserSearch(userInput).then(
      (success) => {
        this.globalUserReturn = this.apiCall.users;
        this.isUsers = true;
      },
      (error) => {
        alert('User not found');
        console.log(error);
      }
    );
  }
}
