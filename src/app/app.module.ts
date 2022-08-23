import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { ShowUserDetailsComponent } from './show-user-details-list/show-user-details/show-user-details.component';
import { UserDetailsFormComponent } from './user-details-form/user-details-form.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { UserService } from './user.service';
import { ShowUserDetailsListComponent } from './show-user-details-list/show-user-details-list.component';
import { UserSelectComponent } from './show-user-details-list/user-select/user-select.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    ShowUserDetailsComponent,
    UserDetailsFormComponent,
    ShowUserDetailsListComponent,
    UserSelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
