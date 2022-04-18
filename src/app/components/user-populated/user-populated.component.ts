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
    this.apiCall.globalUserSearch('thesmartcoder7');
  }
}
