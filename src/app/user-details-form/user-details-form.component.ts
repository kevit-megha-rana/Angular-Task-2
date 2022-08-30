import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EnumRegex } from 'src/enum-regex';
import { IUser, UserService } from '../user.service';

@Component({
  selector: 'app-user-details-form',
  templateUrl: './user-details-form.component.html',
  styleUrls: ['./user-details-form.component.css']
})

export class UserDetailsFormComponent implements OnInit {

  hobbies: any = [
    {
      name: "Cricket",
      value: "cricket",
      selected: false
    },
    {
      name: "Mobile-games",
      value: "mobile-games",
      selected: false
    },
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
    }
  ];

  genders: string[] = ['male','female'];
  userDetailsForm : FormGroup;
  userDetails : IUser[] =[];
  selectedHobbyValues = [];
  selectedHobby = [];
  index: number;
  

  constructor(private router:Router,
              private route:ActivatedRoute,
              private userService:UserService) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params:Params) => {
          this.index = params['id'];
          this.initForm();
      }
    )
    this.userDetails = this.userService.userDetails;  
  }

  private initForm(){
    let user:IUser;
     
    if(this.index){
      user = this.userService.getUserById(this.index);
    }  
    
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
      'summary': new FormControl(user?.summary || "")

    });
  }

  addHobbyControls(){
      if(this.index){
        const user = this.userService.getUserById(this.index); 
        const arr = user.hobby.map(hobbie =>{
          return new FormControl(hobbie['selected']);
        });
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
    this.selectedHobby = [];
    this.selectedHobbyValues = [];
    this.hobbiesArray().forEach((control,i) =>{
      if(control.value){
        this.hobbies[i].selected = !this.hobbies[i].selected;
        this.selectedHobbyValues.push(this.hobbies[i].value);   
      }
      this.selectedHobby.push(this.hobbies[i]);
    });
  }

  onSubmit(){
    this.getSelectedHobbyValue();
    const hobbyValues = this.selectedHobbyValues;
    const hobby = this.selectedHobby;
    if(this.index){
      this.userService.updateUser(this.index,{...this.userDetailsForm.value,hobbyValues,hobby});
    }
    else{
    this.userDetails.push({...this.userDetailsForm.value,hobbyValues,hobby});
    }
    
    this.router.navigate(['/user-details']);
    
  }

  onReset(){
    this.userDetailsForm.reset();
  }

}
