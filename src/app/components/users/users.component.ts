import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Router } from '@angular/router';
import { Repository } from 'src/app/classes/repository';

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
  isSingleRepository: boolean = false;

  singleUserImage!: string;
  singleUserLogin!: string;
  singleRepository!: any;

  constructor(private apiCall: ApiServiceService, private route: Router) {}

  ngOnInit(): void {}

  goToUser(index: number) {
    this.route.navigate(['/user'], {
      queryParams: { data: this.globalUserReturn[index].login },
    });
  }

  goToUserFromRepo(login: string) {
    this.route.navigate(['/user'], {
      queryParams: { data: login },
    });
  }

  globalRepositorySearch(userInput: string) {
    this.apiCall.globalRepositorySearch(userInput).then(
      (success) => {
        this.globalRepoReturn = this.apiCall.repositories;
        this.isRepositories = true;
        this.isSingleRepository = false;
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
        this.isSingleRepository = false;
      },
      (error) => {
        alert('User not found');
        console.log(error);
      }
    );
  }

  showSingleRepo(i: number) {
    this.singleRepository = this.globalRepoReturn[i];
    console.log(this.singleRepository);
    this.isSingleRepository = true;
    this.isUsers = false;
    this.isRepositories = false;
  }

  repoResults() {
    this.isSingleRepository = false;
    this.isUsers = false;
    this.isRepositories = true;
  }
}
