import { Component} from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { IUser } from '../../shared/user.model';

@Component({
  selector: 'app-show-user-details',
  templateUrl: './show-user-details.component.html',
  styleUrls: ['./show-user-details.component.css']
})
export class ShowUserDetailsComponent {

  user: IUser;
  editID: number;

  constructor(private route:ActivatedRoute,
              private apiService:ApiService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params:Params) =>{
           this.editID = params['id'];
           this.apiService.getUserByID(this.editID)
           .subscribe(res=>{
            this.user = res;
           },
           err=>{
            return err;
           });
        }
    );
  }

}
