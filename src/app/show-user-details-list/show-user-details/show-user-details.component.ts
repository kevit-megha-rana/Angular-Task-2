import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IUser, UserService } from '../../user.service';

@Component({
  selector: 'app-show-user-details',
  templateUrl: './show-user-details.component.html',
  styleUrls: ['./show-user-details.component.css']
})
export class ShowUserDetailsComponent implements OnInit {

  user: IUser;
  editID: string;

  constructor(private userService:UserService,
              private router:Router,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params:Params) =>{
           this.editID = params['id'];
           this.user = this.userService.getUserById(this.editID);
        }
      );
  }

  onEdit(){
      this.router.navigate(['/user',this.editID]);
  }

}
