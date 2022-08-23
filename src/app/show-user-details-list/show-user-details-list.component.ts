import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser, UserService } from '../user.service';

@Component({
  selector: 'app-show-user-details-list',
  templateUrl: './show-user-details-list.component.html',
  styleUrls: ['./show-user-details-list.component.css']
})
export class ShowUserDetailsListComponent implements OnInit {

  userDetails : IUser[] =[];

  constructor(private router:Router,
              private userService:UserService) { }

  ngOnInit(): void {
    this.userDetails = this.userService.userDetails; 
  }

  onAddUser(){
    this.router.navigate(['/new-user']);
  }
}
