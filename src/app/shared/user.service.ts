import { Injectable} from "@angular/core";
import { ApiService } from "./api.service";

export interface IUser {
    name: string,
    dateOfBirth: string,
    email: string,
    phoneNumber: string,
    education: {
        instituteName: string, 
        degree: string, 
        percentage: string},
    hobbies?: boolean[],
    gender: string,
    address?: string,
    summary?: string,
    hobbyValues?: string[],
    hobby?: any[],
    uid: string,
    id: number
};

@Injectable({providedIn:'root'})

export class UserService{

constructor(private apiService?:ApiService){}

private _userDetails : IUser[] = [];

public get userDetails(){
    this.apiService.getUser().subscribe(res=>{
        this.userDetails = res;
      },
      err =>{
        return err;
      })
    return this._userDetails; 
}

public set userDetails(theUserDetails: IUser[]){
    this._userDetails = theUserDetails;

}

getUserById(userID:string){
    return this.userDetails.find(user => user.uid === userID);
}

updateUser(editID:string,user:IUser){
    let userIndex = this.userDetails.findIndex((userObj => userObj.uid === editID));
    let id = this.userDetails[userIndex].id;
    this.apiService.putUser(user,id)
      .subscribe(res=>{
        return res;
      },
      err =>{
        return err;
      })
    this._userDetails[userIndex] = user;
}

deleteUsers(editId:number){
    this.apiService.deleteUser(editId)
    .subscribe(res=>{
      return res;
    },
    err =>{
      return err;
    })
  }

}
