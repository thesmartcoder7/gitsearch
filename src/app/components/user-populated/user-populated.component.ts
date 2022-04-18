import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-user-populated',
  templateUrl: './user-populated.component.html',
  styleUrls: ['./user-populated.component.css'],
})
export class UserPopulatedComponent implements OnInit {
  currentUser!: User;
  constructor(private apiCall: ApiServiceService) {}

  ngOnInit(): void {
    // this.apiCall.globalUserSearch('thesmartcoder7');
    // this.apiCall.userSearch('thesmartcoder7');
    this.getUserDetails('thesmartcoder7');
  }

  getUserDetails(username: string) {
    this.apiCall.userSearch(username).then(
      (success) => {
        console.log(success);
      },
      (error) => {
        alert('User not found');
        console.log(error);
      }
    );
  }
}
