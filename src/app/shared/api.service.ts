import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser} from './user.model';


@Injectable({providedIn:'root'})

export class ApiService {

    constructor(private http:HttpClient){}

    getUsers(){
        return this.http.get<IUser[]>("http://localhost:3000/posts");
    }

    getUserByID(editId:number){
        return this.http.get<IUser>("http://localhost:3000/posts/"+editId);
    }

    postUser(data:IUser){
        return this.http.post<IUser>("http://localhost:3000/posts",data);
    }

    putUser(data:IUser,editId:number){
        return this.http.put<IUser>("http://localhost:3000/posts/"+editId,data);
    }

    deleteUser(editId:number){
        return this.http.delete<IUser>("http://localhost:3000/posts/"+editId);
    }

}