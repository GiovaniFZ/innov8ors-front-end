import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UsersDataService } from '../services/users-data.service';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-adm-proj-details',
  templateUrl: './adm-proj-details.component.html',
  styleUrl: './adm-proj-details.component.css'
})
export class AdmProjDetailsComponent {
  constructor(private router: ActivatedRoute, private location: Location, private userDataService: UsersDataService, private route: Router) { }
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
  bearer = String(this.router.snapshot.paramMap.get('bearer'));
  newTitle:string = '';
  // Controle de errors
  isEditing: boolean = false;
  loading:boolean = false;
  errorAt:boolean = false;
  memAdded:boolean = false;
  membDeleted:boolean = false;
  gradeAdded:boolean = false;
  mode:ProgressSpinnerMode = 'indeterminate';
  color = 'primary';


  ngOnInit(){
    this.json = this.userDataService.getTeamsDetails();
    // Dados do json
    this.id = this.json["teamId"];
    this.name = this.json["teamName"];
    this.membros = this.json["members"];
    this.notas = this.json["grades"];

    for (let member of this.membros) {
      this.member_emails.push(member["email"]);
      this.member_names.push(member["name"]);
    }
    
    for (let nota of this.notas) {
      this.names_phase.push(nota["phaseName"]);
      this.notas_phase.push(nota["grade"]);
    }
  }

  goBack(){
    this.location.back();
  }

  edit(){
    this.route.navigate(['/adm-updater', this.bearer]);
  }

  addMember(){
    this.loading = true;
    this.errorAt = false;
    const path = '/adm/teams/' + this.id + '/members';
    let json2 = {
      name: this.memberName,
      email: this.memberEmail
    }
    this.userDataService.handlePost(this.bearer, path, json2).subscribe(
      (response) => {
        this.loading = false;
        console.log('Entrou no response');
        console.log(response)
      },
      (error) => {      
        console.log('Entrou no error');
        this.loading = false;
        console.log(error);
      }
    );
  }

  addGrade(){
    this.errorAt = false;
    this.loading = true;
    const path = '/adm/teams/' + this.id + '/grade';
    let json = {
      "phaseId": this.phaseId,
      "grade": this.newGrade
    }
    this.userDataService.handlePost(this.bearer, path, json).subscribe(
      (response) => {
        this.loading = false;
        this.errorAt = false;
        this.gradeAdded = true;
        console.log(response)
      },
      (error) => {    
        if(error.status === 200){
          this.loading = false;
          this.errorAt = false;
          this.gradeAdded = true;
        }
        else{
          this.loading = false;
          this.errorAt = true;
          this.gradeAdded = false;
          console.log(error);
        }
      }
    )
  }

  deleteMember(){
    this.loading = true;
    this.errorAt = false;
    const path = '/adm/teams/' + this.id + '/members';
    this.userDataService.handleDelete(this.bearer, path, this.removedMember).subscribe(
      (response) => {
        console.log('Entrou no response');
        this.loading = false;
        console.log(response)
      },
      (error) => {      
        console.log('Entrou no error');
        this.loading = false;
        this.errorAt = true;
        console.log(error);
      }
    );
  }
}
