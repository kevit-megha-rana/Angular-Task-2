import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { EnumRegex } from 'src/enum-regex';
import { ApiService } from '../shared/api.service';
import { IUser, UserService } from '../shared/user.service';

@Component({
  selector: 'app-user-details-form',
  templateUrl: './user-details-form.component.html',
  styleUrls: ['./user-details-form.component.css']
})

export class UserDetailsFormComponent implements OnInit {

  hobbies: any = [
    {
      name: "Movie",
      value: "movie",
      selected: false
    },
    {
      name: "Travelling",
      value: "travelling",
      selected: false
    },
    {
      name: "Sleeping",
      value: "sleeping",
      selected: false
    },
    {
      name: "Cricket",
      value: "cricket",
      selected: false
    },
    {
      name: "Mobile-games",
      value: "mobile-games",
      selected: false
    }
  ];

  genders: string[] = ['male','female'];
  userDetailsForm : FormGroup;
  userDetails : IUser[] = [];
  selectedHobbyValues = [];
  uid: string; // to generate unique userId when new user is created
  editID: string;
  

  constructor(private router:Router,
              private route:ActivatedRoute,
              private userService:UserService,
              private apiservice:ApiService) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params:Params) => {
          this.editID = params['id'];
          this.initForm();
      }
    )
    this.userDetails = this.userService.userDetails;    
  }

  private initForm(){
    let user:IUser;
     
    if(this.editID){
      user = this.userService.getUserById(this.editID);
    }  

    this.uid = UUID.UUID();

    this.userDetailsForm = new FormGroup({
      'name': new FormControl(user?.name || "",[Validators.required,Validators.pattern(EnumRegex.Name)]),
      'dateOfBirth': new FormControl(user?.dateOfBirth || "",Validators.required),
      'email': new FormControl(user?.email || "",[Validators.required,Validators.email]),
      'phoneNumber': new FormControl(user?.phoneNumber || "",[Validators.required,Validators.pattern(EnumRegex.PhoneNumber)]),
      'education': new FormGroup({
        'instituteName': new FormControl(user?.education.instituteName || "",[Validators.required,Validators.pattern(EnumRegex.InstituteName)]),
        'degree': new FormControl(user?.education.degree || "",[Validators.required,Validators.pattern(EnumRegex.Degree)]),
        'percentage': new FormControl(user?.education.percentage || "",[Validators.required,Validators.pattern(EnumRegex.Percentage)]),
      }),
      'hobbies': this.addHobbyControls(),
      'gender': new FormControl(user?.gender || "",Validators.required),
      'address': new FormControl(user?.address || ""),
      'summary': new FormControl(user?.summary || ""),
      'uid': new FormControl(user?.uid || this.uid)
    });
  }

  addHobbyControls(){
      if(this.editID){
        const user = this.userService.getUserById(this.editID); 
        const arr = this.hobbies.map((hobbie) => {
          if(user.hobbyValues.includes(hobbie.value)){
            return new FormControl(true);
          }
            return new FormControl(false);
        })
        return new FormArray(arr);
      }
      else{
        const arr = this.hobbies.map((hobby) =>{
          return new FormControl(hobby.selected);
        });
        return new FormArray(arr);
      } 
  }

  hobbiesArray() {
    return (<FormArray>this.userDetailsForm.get('hobbies')).controls;
  }

  getSelectedHobbyValue(){
    this.selectedHobbyValues = [];
    this.hobbiesArray().forEach((control,i) =>{
      if(control.value){
        this.hobbies[i].selected = !this.hobbies[i].selected;
        this.selectedHobbyValues.push(this.hobbies[i].value);   
      }
    });
  }

  onSubmit(){
    this.getSelectedHobbyValue();
    const hobbyValues = this.selectedHobbyValues;
    if(this.editID){
      this.userService.updateUser(this.editID,{...this.userDetailsForm.value,hobbyValues});
    }
    else{
    this.userDetails.push({...this.userDetailsForm.value,hobbyValues});
    this.apiservice.postUser({...this.userDetailsForm.value,hobbyValues})
    .subscribe(res=>{
      return res;
    },
    err =>{
      return err;
    })
    }
    this.router.navigate(['/user-details']);
  }

  onReset(){
    this.userDetailsForm.reset();
  }

}
