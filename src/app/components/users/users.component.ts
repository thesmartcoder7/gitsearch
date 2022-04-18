import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  globalUserReturn!: any[];
  globalRepoReturn!: any[];
  isUsers: boolean = false;
  isRepositories: boolean = false;

  constructor(private apiCall: ApiServiceService, private route: Router) {}

  ngOnInit(): void {}

  goToUser(index: number) {
    this.route.navigate(['/user'], {
      queryParams: { data: this.globalUserReturn[index].login },
    });
  }

  globalRepositorySearch(userInput: string) {
    this.apiCall.globalRepositorySearch(userInput).then(
      (success) => {
        this.globalRepoReturn = this.apiCall.repositories;
        this.isRepositories = true;
        this.isUsers = false;
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
        this.isRepositories = false;
      },
      (error) => {
        alert('User not found');
        console.log(error);
      }
    );
  }
}
