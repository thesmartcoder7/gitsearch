import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';

import { ApiServiceService } from 'src/app/services/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-user-populated',
  templateUrl: './user-populated.component.html',
  styleUrls: ['./user-populated.component.scss'],
})
export class UserPopulatedComponent implements OnInit {
  currentUser$: Observable<User> | undefined;
  user!: string;
  repositories!: any[];
  mostForked: any;
  mostStarred: any;
  mostStarred$: Observable<any> | null = null;
  starCount: number = 0;
  totalForks: number = 0;
  constructor(
    private apiCall: ApiServiceService,
    private route: ActivatedRoute,
    private otherRoute: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.user = params.data;
    });
    this.getUserDetails(this.user);
    this.getRepositories(this.user);
  }

  goToRepositories(user: User) {
    this.otherRoute.navigate(['/repository'], {
      queryParams: { data: this.user },
    });
  }

  getRepositories(username: string) {
    this.apiCall.userRepositoriesSearch(username).then(
      (success) => {
        this.repositories = this.apiCall.userRepositories;
        this.mostForked = this.repositories[0];
        this.mostStarred = this.repositories[0];
        for (let i = 0; i < this.repositories.length; i++) {
          if (this.repositories[i].forks_count > this.mostForked.forks_count) {
            this.mostForked = this.repositories[i];
          }
        }
        for (let i = 0; i < this.repositories.length; i++) {
          if (
            this.repositories[i].stargazers_count >
            this.mostStarred.stargazers_count
          ) {
            this.mostStarred = this.repositories[i];
          }
        }
        // console.log(this.mostForked);
        for (let i = 0; i < this.repositories.length; i++) {
          this.totalForks += this.repositories[i].forks_count;
        }

        this.mostStarred$ = of(this.mostStarred);
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
        this.currentUser$ = of(
          new User(
            this.apiCall.user.login,
            this.apiCall.user.name,
            this.apiCall.user.followers,
            this.apiCall.user.created_at,
            this.apiCall.user.html_url,
            this.apiCall.user.avatar_url,
            this.apiCall.user.public_repos
          )
        );
      },
      (error) => {
        alert('User not found');
        console.log(error);
      }
    );
  }

  goBack() {
    this.location.back();
  }
}
