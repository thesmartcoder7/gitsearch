import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-populated',
  templateUrl: './user-populated.component.html',
  styleUrls: ['./user-populated.component.css'],
})
export class UserPopulatedComponent implements OnInit {
  currentUser!: any;
  user!: string;
  constructor(
    private apiCall: ApiServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.user = params.data;
    });
    this.getUserDetails(this.user);
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
        console.log(typeof this.currentUser.membership);
      },
      (error) => {
        alert('User not found');
        console.log(error);
      }
    );
  }
}
