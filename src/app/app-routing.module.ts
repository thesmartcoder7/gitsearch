import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPopulatedComponent } from './components/user-populated/user-populated.component';
import { RepositoriesComponent } from './components/repositories/repositories.component';
import { UsersComponent } from './components/users/users.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RepositoryPopulatedComponent } from './components/repository-populated/repository-populated.component';

const routes: Routes = [
  { path: 'user', component: UserPopulatedComponent },
  { path: 'repository', component: RepositoriesComponent },
  { path: 'single-repo', component: RepositoryPopulatedComponent },
  { path: '', component: UsersComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
