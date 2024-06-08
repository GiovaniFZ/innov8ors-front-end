import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Location, CommonModule } from '@angular/common';
import { UsersDataService } from '../services/users-data.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-adm-updater',
  standalone: true,
  imports: [
    MatExpansionModule, 
    MatFormFieldModule,MatButton,
    CommonModule, 
    FormsModule,
    MatInput,
    MatIconModule],
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

  goBack(){
    this.location.back();
  }

}
