import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-repository-populated',
  templateUrl: './repository-populated.component.html',
  styleUrls: ['./repository-populated.component.scss'],
})
export class RepositoryPopulatedComponent implements OnInit {
  repository!: any;
  repositories!: any[];
  user!: any;
  constructor(
    private route: ActivatedRoute,
    private apiCall: ApiServiceService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      let data = params.data.split(' ');
      let repoName = data[2];
      let repoOwner = data[1];
      let repoId = data[0];
      this.apiCall.userRepositoriesSearch(repoOwner).then(
        (success) => {
          this.repositories = this.apiCall.userRepositories;
          for (let repository of this.repositories) {
            if(Number(repoId) == repository.id && repoOwner == repository.owner.login && repoName == repository.name){
              this.repository = repository
            }
          }
          console.log(this.repository);
        },
        (error) => {
          console.log('Repository not found!')
        }
      );
    });
  }
}
