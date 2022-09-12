import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { EnumRegex } from 'src/enum-regex';
import { ApiService } from '../shared/api.service';
import { IUser } from '../shared/user.model';



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
  userDetailsForm: FormGroup ;
  selectedHobbyValues = [];
  uid: string; // to generate unique userId when new user is created
  editID: number;
  user: IUser;
  

  constructor(private router:Router,
              private route:ActivatedRoute,
              private apiService:ApiService) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params:Params) => {
          this.editID = params['id'];
          this.initForm();
      }
    )  
  }

  private initForm(){

    
    this.uid = UUID.UUID();

    if(this.editID){
      this.apiService.getUserByID(this.editID)
      .subscribe(res=>{
        this.user = res;
        this.userDetailsForm = new FormGroup({
          'name': new FormControl("" || this.user?.name,[Validators.required,Validators.pattern(EnumRegex.Name)]),
          'dateOfBirth': new FormControl("" || this.user?.dateOfBirth,Validators.required),
          'email': new FormControl("" || this.user?.email,[Validators.required,Validators.email]),
          'phoneNumber': new FormControl("" || this.user?.phoneNumber,[Validators.required,Validators.pattern(EnumRegex.PhoneNumber)]),
          'education': new FormGroup({
            'instituteName': new FormControl("" || this.user?.education.instituteName,[Validators.required,Validators.pattern(EnumRegex.InstituteName)]),
            'degree': new FormControl("" || this.user?.education.degree,[Validators.required,Validators.pattern(EnumRegex.Degree)]),
            'percentage': new FormControl("" || this.user?.education.percentage,[Validators.required,Validators.pattern(EnumRegex.Percentage)]),
          }),
          'hobbies': this.addHobbyControls(),
          'gender': new FormControl("" || this.user?.gender,Validators.required),
          'address': new FormControl("" || this.user?.address),
          'summary': new FormControl("" || this.user?.summary),
          'uid': new FormControl( "" || this.user?.uid)
        });    
      })
    }

    if(!this.editID){
        this.userDetailsForm = new FormGroup({
          'name': new FormControl("",[Validators.required,Validators.pattern(EnumRegex.Name)]),
          'dateOfBirth': new FormControl("",Validators.required),
          'email': new FormControl("",[Validators.required,Validators.email]),
          'phoneNumber': new FormControl("",[Validators.required,Validators.pattern(EnumRegex.PhoneNumber)]),
          'education': new FormGroup({
            'instituteName': new FormControl("",[Validators.required,Validators.pattern(EnumRegex.InstituteName)]),
            'degree': new FormControl("",[Validators.required,Validators.pattern(EnumRegex.Degree)]),
            'percentage': new FormControl("",[Validators.required,Validators.pattern(EnumRegex.Percentage)]),
          }),
          'hobbies': this.addHobbyControls(),
          'gender': new FormControl("",Validators.required),
          'address': new FormControl(""),
          'summary': new FormControl(""),
          'uid': new FormControl(this.uid)
        });    
    }
  }

  addHobbyControls(){
    if(this.editID){
      const arr = this.hobbies.map((hobbie) => {
        if(this.user.hobbyValues.includes(hobbie.value)){
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
    this.apiService.putUser({...this.userDetailsForm.value,hobbyValues},this.editID)
    .subscribe(res=>{
      this.router.navigate(['/user-details']);
    },
    err =>{
    })
    }
    else{
    this.apiService.postUser({...this.userDetailsForm.value,hobbyValues})
    .subscribe(res=>{
      this.router.navigate(['/user-details']);
    },
    err =>{
    })
    }
  }

  onReset(){
    this.userDetailsForm.reset();
  }

}
