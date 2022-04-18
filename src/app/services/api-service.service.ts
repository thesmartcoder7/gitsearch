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
  //global user search
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
            // console.log(this.user);
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

  //single user search
  userSearch(userInput: string) {
    interface ApiResponse {
      name: string;
      login: string;
    }
    let promise = new Promise<void>((resolve, reject) => {
      return this.http
        .get<ApiResponse>(`${environment.userSearch}${userInput}`)
        .subscribe({
          next: (res: any) => {
            this.user = res;
            resolve();
          },
          error: (error: any) => {
            reject(error);
          },
          complete: () => {
            // console.log('complete');
          },
        });
    });
    return promise;
  }
}
