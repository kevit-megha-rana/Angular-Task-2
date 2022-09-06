import { Component} from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { IUser, UserService } from '../../shared/user.service';

@Component({
  selector: 'app-show-user-details',
  templateUrl: './show-user-details.component.html',
  styleUrls: ['./show-user-details.component.css']
})
export class ShowUserDetailsComponent {

  user: IUser;
  editID: string;

  constructor(private userService:UserService,
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

}
