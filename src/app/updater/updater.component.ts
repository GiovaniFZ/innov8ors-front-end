import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { Location, CommonModule } from '@angular/common';
import { UsersDataService } from '../services/users-data.service';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-updater',
  standalone: true,
  imports: [
    MatExpansionModule, 
    MatFormFieldModule,MatButton,
    CommonModule, 
    FormsModule,
    MatInput],
  templateUrl: './updater.component.html',
  styleUrl: './updater.component.css'
})
export class UpdaterComponent {
  constructor(private route: ActivatedRoute, private location: Location, private userDataService: UsersDataService) { }
  panelOpenState: boolean = false;
  id = '';
  json:any;
  name = '';
  membros = [];
  notas = [];
  notas_phase:number[] = [];
  names_phase:string[] = [];
  member_emails:string[] = [];
  member_names:string[] = [];
  phaseNames = [];
  // Dados editáveis
  memberName = '';
  memberEmail = '';
  phaseId = '';
  newGrade = '';
  removedMember = '';
  bearer = String(this.route.snapshot.paramMap.get('bearer'));


  ngOnInit(){
    this.json = this.userDataService.getTeamsDetails();
    // Dados do json
    this.id = this.json["teamId"];
    this.name = this.json["teamName"];
    this.membros = this.json["members"];
    this.notas = this.json["grades"];

    for (let member of this.membros) {
      this.member_emails.push(member["name"]);
      this.member_names.push(member["email"]);
    }
    
    for (let nota of this.notas) {
      this.names_phase.push(nota["phaseName"]);
      this.notas_phase.push(nota["grade"]);
    }
    console.log(this.names_phase);
  }

  goBack(){
    this.location.back();
  }

  addMember(){
    const path = '/adm/teams/' + this.id + '/members'
    let json2 = {
      name: this.memberName,
      email: this.memberEmail
    }
    this.userDataService.handlePost(this.bearer, path, json2).subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {      
        console.log(error);
      }
    );
  }

  deleteMember(){
    const path = '/adm/teams/' + this.id + '/members'
    this.userDataService.handleDelete(this.bearer, path).subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {      
        console.log(error);
      }
    );
  }
}
