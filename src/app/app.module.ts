import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HighlightDirective } from './directives/highlight.directive';
import { RepositoriesComponent } from './components/repositories/repositories.component';
import { FollowersComponent } from './components/followers/followers.component';
import { UsersComponent } from './components/users/users.component';
import { UserPopulatedComponent } from './components/user-populated/user-populated.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HighlightDirective,
    RepositoriesComponent,
    FollowersComponent,
    UsersComponent,
    UserPopulatedComponent,
    PageNotFoundComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
