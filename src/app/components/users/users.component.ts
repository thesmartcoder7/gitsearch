import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
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
  searchForm = true;

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
        if (this.globalRepoReturn.length === 0) {
          this.isRepositories = false;
          alert('There are no Repositories found with that title');
        } else {
          this.isRepositories = true;
        }
        this.isSingleRepository = false;
        this.isUsers = false;
      },
      (error) => {
        alert('Please fill in the form as required');
        console.log(error);
      }
    );
  }

  // gets any user with the same name or username as the user input
  globalUserSearch(userInput: string) {
    this.apiCall.globalUserSearch(userInput).then(
      (success) => {
        this.globalUserReturn = this.apiCall.users;
        if (this.globalUserReturn.length === 0) {
          this.isUsers = false;
          alert('There are no Users found with that name');
        } else {
          this.isUsers = true;
        }
        this.isRepositories = false;
        this.isSingleRepository = false;
      },
      (error) => {
        alert('Please fill in the form as required');
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
    this.searchForm = false;
  }

  goToRepo(index: number) {
    this.route.navigate(['/single-repo'], {
      queryParams: {
        data: `${this.globalRepoReturn[index].id} ${this.globalRepoReturn[index].owner.login} ${this.globalRepoReturn[index].name}`,
      },
    });
  }

  repoResults() {
    this.isSingleRepository = false;
    this.isUsers = false;
    this.isRepositories = true;
  }
}
