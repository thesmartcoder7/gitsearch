import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  user!: any;
  users!: object[];
  userRepositories!: any[];
  repositories!: any[];
  singleRepositoy!: object[];

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `token ${environment.accessToken}`,
    }),
  };

  //global user search
  globalUserSearch(userInput: string) {
    let promise = new Promise<void>((resolve, reject) => {
      this.http
        .get<User[]>(
          `${environment.globalUserSearch}${userInput}&per_page=500`,
          {
            headers: {
              Authorization: `token ${environment.accessToken}`,
            },
          }
        )
        .subscribe({
          next: (res: any) => {
            this.users = res.items;
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

  //global repository search
  globalRepositorySearch(userInput: string) {
    let promise = new Promise<void>((resolve, reject) => {
      this.http
        .get<any>(`${environment.globalRepoSearch}${userInput}&per_page=500`, {
          headers: {
            Authorization: `token ${environment.accessToken}`,
          },
        })
        .subscribe({
          next: (res: any) => {
            let tempStore = [];
            for (let item of res.items) {
              if (item.visibility == 'public') {
                tempStore.push(item);
              }
            }
            this.repositories = tempStore;
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
    let promise = new Promise<void>((resolve, reject) => {
      return this.http
        .get<User>(`${environment.userSearch}${userInput}`, {
          headers: {
            Authorization: `token ${environment.accessToken}`,
          },
        })
        .subscribe({
          next: (res: User) => {
            this.user = res;
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

  //single repository search
  userRepositoriesSearch(userInput: string) {
    let promise = new Promise<void>((resolve, reject) => {
      return this.http
        .get<any[]>(
          `${environment.userSearch}${userInput}/repos?per_page=1000`,
          {
            headers: {
              Authorization: `token ${environment.accessToken}`,
            },
          }
        )
        .subscribe({
          next: (res: any[]) => {
            this.userRepositories = res;
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
}
