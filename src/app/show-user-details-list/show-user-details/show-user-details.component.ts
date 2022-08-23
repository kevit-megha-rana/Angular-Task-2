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
  index: number;

  constructor(private userService:UserService,
              private router:Router,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params:Params) =>{
           this.index = +params['id'];
           this.user = this.userService.getUserById(this.index);
        }
      );
  }

  onEdit(){
      this.router.navigate(['/user-details',this.index,'edit']);
  }

}
