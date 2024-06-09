import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { UsersDataService } from '../services/users-data.service';
import { ActivatedRoute } from '@angular/router';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-adm-updater',
  templateUrl: './adm-updater.component.html',
  styleUrl: './adm-updater.component.css'
})
export class AdmUpdaterComponent {
  constructor(private userDataService: UsersDataService, private router: ActivatedRoute, private location: Location){}
  json:any;
  advisorId = '';
  id = '';
  name = '';
  membros = '';
  notas = '';
  newName = '';
  newAdvName = '';
  newAdvEmail = '';
  status:boolean = false;
  // Progress Spinner
  color = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  errorAt: boolean = false;
  loading:boolean = false;
  advUpdated:boolean = false;
  membUpdated:boolean = false;
  statUpdated:boolean = false;

  bearer = String(this.router.snapshot.paramMap.get('bearer'));
  ngOnInit(){
    this.json = this.userDataService.getTeamsDetails();
    console.log(this.json);
    // Dados do json
    this.id = this.json["teamId"];
    this.advisorId = this.json["advisorId"];
    this.name = this.json["teamName"];
    this.membros = this.json["members"];
    this.notas = this.json["grades"];
  }
  submitNewName(){
    this.loading = true;
    const path = '/adm/teams/'+this.id+'/name';
    let json = {
      "newTeamName": this.newName
    }
    this.userDataService.handlePut(this.bearer, path, json).subscribe(
      (response) => {
        this.membUpdated = true;
        this.loading = false;
        this.errorAt = false;
        console.log(response);
      },
      (error) => {
        if(error.status === 200){
          this.membUpdated = true; 
          this.errorAt = false;
          this.loading = false; 
        }
        else{
          this.errorAt = true;
          console.log(error);
        }    
      }
    );
  }

  submitNewAdv(){
    this.loading = true;
    let json = {
      "newAdvisor": {
        "name": this.newAdvName,
        "email": this.newAdvEmail
      }
    }
    const path = '/adm/teams/'+this.id+'/advisor';
    this.userDataService.handlePut(this.bearer, path, json).subscribe(
      (response) => {
        this.loading = false;
        this.errorAt = false;
        this.advUpdated = true;
        console.log(response)
      },
      (error) => {
        if(error.status === 200){
          this.advUpdated = true; 
          this.errorAt = false;
          this.loading = false; 
        }
        this.errorAt = true;
        this.loading = false;      
        console.log(error);
      });
  }

  submitNewStatus(){
    let json = {
      "isActive": this.status
    }
    const path = '/adm/teams/'+this.id+'/status';
    console.log('Status');
  this.userDataService.handlePut(this.bearer, path, json).subscribe(
    (response) => {
      this.errorAt = false;
      this.statUpdated = true;
      console.log(response);
    },
    (error) => {  
      if(error.status === 200){
        this.membUpdated = true; 
        this.errorAt = false;
        this.loading = false; 
      }    
      this.errorAt = true;
      console.log(error);
    });
  }

  goBack(){
    this.location.back();
  }

}
