import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ShowUserDetailsListComponent } from "./show-user-details-list/show-user-details-list.component";
import { ShowUserDetailsComponent } from "./show-user-details-list/show-user-details/show-user-details.component";
import { UserSelectComponent } from "./show-user-details-list/user-select/user-select.component";
import { UserDetailsFormComponent } from "./user-details-form/user-details-form.component";
import { UserLoginComponent } from "./user-login/user-login.component";

const appRoutes: Routes =[
    {path:'',redirectTo:'/login',pathMatch:'full'},
    {path:'login',component:UserLoginComponent},
    {path:'user',component:UserDetailsFormComponent},
    {path:'user-details',component:ShowUserDetailsListComponent,children:[
        {path:'',component:UserSelectComponent},
        {path:':id',component:ShowUserDetailsComponent},   
    ]},
    {path:'user/:id',component:UserDetailsFormComponent},
    {path:'page-not-found',component:PageNotFoundComponent},
    {path:'**',redirectTo:'/page-not-found'}
];

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule{

}