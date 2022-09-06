import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { IUser, UserService } from '../shared/user.service';

@Component({
  selector: 'app-show-user-details-list',
  templateUrl: './show-user-details-list.component.html',
  styleUrls: ['./show-user-details-list.component.css']
})
export class ShowUserDetailsListComponent implements OnInit {

  userDetails : IUser[] =[];

  constructor(private router:Router,
              private userService:UserService,
              private apiService:ApiService) { }

  ngOnInit(): void {
    this.apiService.getUser().subscribe(res=>{
      this.userDetails = res;
    },
    err =>{
      return err;
    })
  }

  onAddUser(){
    this.router.navigate(['/user']);
  }

  onDeleteUser(editId:number){
    this.userService.deleteUsers(editId);
    this.router.navigate(['/user-details']);
    this.apiService.getUser().subscribe(res=>{
      this.userDetails = res;
    },
    err =>{
      return err;
    })
  }

}
