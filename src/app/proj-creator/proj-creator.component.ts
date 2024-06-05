import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersDataService } from '../services/users-data.service';
import { HttpResponse } from '@angular/common/http';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Location } from '@angular/common';

@Component({
  selector: 'app-proj-creator',
  templateUrl: './proj-creator.component.html',
  styleUrl: './proj-creator.component.css'
})
export class ProjCreatorComponent {
  tituloProj: string = '';
  membro1: string = '';
  email1: string = '';
  membro2: string = '';
  email2: string = '';
  membro3: string = '';
  email3: string = '';
  membro4: string = '';
  email4: string = '';
  advisorName:string = '';
  emailAdv:string = '';
  loading: boolean = false;
  errorMessage:string = '';
  attempt: boolean = false;
  not_created: boolean = false;
  mode: ProgressSpinnerMode = 'indeterminate';
  color = 'primary';

  constructor(private userDataService: UsersDataService, private router: ActivatedRoute, private location: Location) {}
  bearer = String(this.router.snapshot.paramMap.get('bearer'));

  saveProject(){
    let jsonProj ={
      "teamName": this.tituloProj,
      "members": [
        {
          "name": this.membro1,
          "email": this.email1
        },
        {
          "name": this.membro2,
          "email": this.membro3
        },
        {
          "name": this.membro3,
          "email": this.email3
        },
        {
          "name": this.membro4,
          "email": this.email4
        }
      ],
      "advisor": {
        "name": this.advisorName,
        "email": this.emailAdv
      }
    }
    this.loading = true;
    this.userDataService.tryCreate(jsonProj, this.bearer).subscribe(
      (response: HttpResponse<any>) =>{
        console.log('Response: ', response);
      },
      (error) => { // Angular trata Status 201 como erro
        if(error.status === 201){
          this.attempt = true;
        }else{ // Projeto não criado
          this.not_created = true;
        }
        this.loading = false;
      }
    );
  }

  goBack(){
    this.location.back();
  }

}
