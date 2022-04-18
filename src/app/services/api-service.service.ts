import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../classes/user';
import { Repository } from '../classes/repository';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  user!: User;
  constructor(private http: HttpClient) {}

  globalUserSearch(userInput: string) {
    interface ApiResponse {
      name: string;
      login: string;
    }
    let promise = new Promise<void>((resolve, reject) => {
      this.http
        .get<ApiResponse>(`${environment.globalUserSearch}${userInput}`, {
          headers: {
            Authorization: `token ${environment.accessToken}`,
          },
        })
        .subscribe({
          next: (res: any) => {
            this.user = res.items[0];
            console.log(this.user);
            resolve();
          },
          error: (error: any) => {
            reject(error);
          },
          complete: () => {
            console.log('complete');
          },
        });
    });

    return promise;
  }
  globalUserSearchReturn() {
    return this.user;
  }
}
