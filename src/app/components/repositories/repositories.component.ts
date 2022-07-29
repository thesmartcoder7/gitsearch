import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Repository } from 'src/app/classes/repository';
import { User } from 'src/app/classes/user';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss'],
})
export class RepositoriesComponent implements OnInit {
  currentUser!: User;
  user!: string;
  repositories!: any[];
  filteredRepositories!: any[];
  bestRepository!: any;
  constructor(
    private route: ActivatedRoute,
    private apiCall: ApiServiceService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.user = params.data;
    });
    this.getUserDetails(this.user);
    this.getRepositories(this.user);
  }

  getRepositories(username: string) {
    this.apiCall.userRepositoriesSearch(username).then(
      (success) => {
        this.repositories = this.apiCall.userRepositories;
        this.bestRepository = this.repositories[0];
        for (let i = 0; i < this.repositories.length; i++) {
          if (
            this.repositories[i].forks_count > this.bestRepository.forks_count
          ) {
            this.bestRepository = this.repositories[i];
          }
        }
      },
      (error) => {
        alert('User not found');
        console.log(error);
      }
    );
  }

  getUserDetails(username: string) {
    this.apiCall.userSearch(username).then(
      (success) => {
        this.currentUser = new User(
          this.apiCall.user.login,
          this.apiCall.user.name,
          this.apiCall.user.followers,
          this.apiCall.user.created_at,
          this.apiCall.user.html_url,
          this.apiCall.user.avatar_url,
          this.apiCall.user.public_repos
        );
      },
      (error) => {
        alert('User not found');
        console.log(error);
      }
    );
  }
}
