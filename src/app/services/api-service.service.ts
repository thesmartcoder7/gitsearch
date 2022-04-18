import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../classes/user';
import { Repository } from '../classes/repository';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  user!: any;
  users!: object[];
  userRepositories!: Repository[];
  repositories!: object[];

  constructor(private http: HttpClient) {}
  //global user search
  globalUserSearch(userInput: string) {
    let promise = new Promise<void>((resolve, reject) => {
      this.http
        .get<any>(`${environment.globalUserSearch}${userInput}`)
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
        .get<any>(`${environment.globalRepoSearch}${userInput}`)
        .subscribe({
          next: (res: any) => {
            this.repositories = res.items;
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
        .get<User>(`${environment.userSearch}${userInput}`)
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
  repositorySearch(userInput: string) {
    let promise = new Promise<void>((resolve, reject) => {
      return this.http
        .get<Repository[]>(`${environment.userSearch}${userInput}/repos`)
        .subscribe({
          next: (res: Repository[]) => {
            this.userRepositories = res;
            console.log(this.userRepositories);
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
