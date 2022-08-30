import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnumRegex } from 'src/enum-regex';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  regex = EnumRegex;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onLogin(){
    this.router.navigate(['/user']); 
  }
}
