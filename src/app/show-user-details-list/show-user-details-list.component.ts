import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { IUser} from '../shared/user.model';

@Component({
  selector: 'app-show-user-details-list',
  templateUrl: './show-user-details-list.component.html',
  styleUrls: ['./show-user-details-list.component.css']
})
export class ShowUserDetailsListComponent implements OnInit {

  userDetails : IUser[] =[];

  constructor(private router:Router,
              private apiService:ApiService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.apiService.getUsers()
    .subscribe(res=>{
      this.userDetails = res;
    },
    err =>{
      console.error(err);
    })  
  }

  onAddUser(){
    this.router.navigate(['/user']);
  }

  onDeleteUser(editId:number){
    this.apiService.deleteUser(editId)
    .subscribe(res=>{
      this.getUsers();
      this.router.navigate(['/user-details']);  
    },
    err =>{
      console.error(err);
    })
  }
}
