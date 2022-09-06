import { Component, OnInit } from '@angular/core';
import { IUser, UserService } from '../../shared/user.service';

@Component({
  selector: 'app-user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.css']
})
export class UserSelectComponent implements OnInit {

  userDetails: IUser[] = [];

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userDetails = this.userService.userDetails;
  }

}
