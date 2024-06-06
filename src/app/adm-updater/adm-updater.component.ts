import { Component } from '@angular/core';
import { UsersDataService } from '../services/users-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adm-updater',
  templateUrl: './adm-updater.component.html',
  styleUrl: './adm-updater.component.css'
})
export class AdmUpdaterComponent {
  constructor(private userDataService: UsersDataService, private router: ActivatedRoute){}
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
    const path = '/adm/teams/'+this.id+'/name';
    let json = {
      "newTeamName": this.newName
    }
    this.userDataService.handlePut(this.bearer, path, json).subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {      
        console.log(error);
      }
    );
  }

  submitNewAdv(){
    let json = {
      "newAdvisor": {
        "name": this.newAdvName,
        "email": this.newAdvEmail
      }
    }
    const path = '/adm/teams/'+this.id+'/advisor';
    this.userDataService.handlePut(this.bearer, path, json).subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {      
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
      console.log(response)
    },
    (error) => {      
      console.log(error);
    });
  }
}
