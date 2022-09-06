import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IUser} from './user.service';


@Injectable({providedIn:'root'})

export class ApiService {

    constructor(private http:HttpClient){}

    getUser(){
        return this.http.get<IUser[]>("http://localhost:3000/posts")
        .pipe(
            map(
                (res:any) =>{
                    return res;
                }
            )
        );
    }

    postUser(data:IUser){
        return this.http.post<IUser>("http://localhost:3000/posts",data)
        .pipe(
            map(
                (res:any) =>{
                    return res;
                }
            )
        );
    }

    putUser(data:IUser,editId:number){
        return this.http.put<IUser>("http://localhost:3000/posts/"+editId,data)
        .pipe(
            map(
                (res:any) =>{
                    return res;
                }
            )
        );
    }

    deleteUser(editId:number){
        return this.http.delete<IUser>("http://localhost:3000/posts/"+editId)
        .pipe(
            map(
                (res:any) =>{
                    return res;
                }
            )
        );
    }

}