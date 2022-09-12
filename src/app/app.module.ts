import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { ShowUserDetailsComponent } from './show-user-details-list/show-user-details/show-user-details.component';
import { UserDetailsFormComponent } from './user-details-form/user-details-form.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ShowUserDetailsListComponent } from './show-user-details-list/show-user-details-list.component';
import { UserSelectComponent } from './show-user-details-list/user-select/user-select.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    ShowUserDetailsComponent,
    UserDetailsFormComponent,
    ShowUserDetailsListComponent,
    UserSelectComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
