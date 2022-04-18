import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  retunedUser!: User;
  globalUserReturn!: object[];

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

  globalUserSearch(userInput: string) {
    // this.apiCall.globalUserSearch(userInput).then(
    //   (success) => {
    //     this.globalUserReturn = this.apiCall.users;
    //     console.log(this.globalUserReturn);
    //   },
    //   (error) => {
    //     alert('User not found');
    //     console.log(error);
    //   }
    // );
    this.apiCall.globalUserSearch(userInput);
  }
}
