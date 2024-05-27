import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { UsersDataService } from '../services/users-data.service';

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
  
  constructor(private userDataService: UsersDataService, private router: ActivatedRoute) {}
  bearer = String(this.router.snapshot.paramMap.get('bearer'));

  jsonProj ={
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

  saveProject(){
    this.loading = true;
    console.log(this.bearer);
    this.userDataService.tryUpdate(this.jsonProj, this.bearer).subscribe(
      (response: any) =>{
        console.log(response);
        this.loading = false;
      },
      (error) => {
        console.error('Request failed with error')
        this.errorMessage = error;
        this.loading = false;
      });
  }

}
