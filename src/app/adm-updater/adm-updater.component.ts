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
  constructor(private userDataService: UsersDataService, private router: ActivatedRoute, private location: Location) { }
  json: any;
  advisorId = '';
  id = '';
  name = '';
  membros = [];
  notas = '';
  newName = '';
  newAdvName = '';
  newAdvEmail = '';
  status: boolean = false;
  member_names: string[] = [];
  member_emails: string[] = [];
  // Progress Spinner
  color = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  errorAt: boolean = false;
  loading: boolean = false;
  advUpdated: boolean = false;
  membUpdated: boolean = false;
  statUpdated: boolean = false;
  resUpdated: boolean = false;

  bearer = String(this.router.snapshot.paramMap.get('bearer'));
  ngOnInit() {
    this.json = this.userDataService.getTeamsDetails();
    console.log(this.json);
    // Dados do json
    this.id = this.json["teamId"];
    this.advisorId = this.json["advisorId"];
    this.name = this.json["teamName"];
    this.membros = this.json["members"];
    this.notas = this.json["grades"];

    for (let member of this.membros) {
      this.member_names.push(member["name"]);
      this.member_emails.push(member["email"]);
    }

    console.log(this.membros)
  }

  // Menu
  selectedMemb: string = 'Selecione um membro';
  posicao: number = 0;
  selectMemb(selectedMemb: string, posicao: number) {
    this.selectedMemb = selectedMemb;
    this.posicao = posicao;
  }

  submitNewName() {
    this.membUpdated = false;
    this.loading = true;
    const path = '/adm/teams/' + this.id + '/name';
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
        if (error.status === 200) {
          this.membUpdated = true;
          this.errorAt = false;
          this.loading = false;
        }
        else {
          this.errorAt = true;
          console.log(error);
        }
      }
    );
  }

  submitNewAdv() {
    this.advUpdated = false;
    this.loading = true;
    let json = {
      "newAdvisor": {
        "name": this.newAdvName,
        "email": this.newAdvEmail
      }
    }
    const path = '/adm/teams/' + this.id + '/advisor';
    this.userDataService.handlePut(this.bearer, path, json).subscribe(
      (response) => {
        this.loading = false;
        this.errorAt = false;
        this.advUpdated = true;
        console.log(response)
      },
      (error) => {
        if (error.status === 200) {
          this.advUpdated = true;
          this.errorAt = false;
          this.loading = false;
        }
        this.errorAt = true;
        this.loading = false;
        console.log(error);
      });
  }

  submitNewStatus() {
    this.statUpdated = false;
    let json = {
      "isActive": this.status
    }
    const path = '/adm/teams/' + this.id + '/status';
    console.log('Status');
    this.userDataService.handlePut(this.bearer, path, json).subscribe(
      (response) => {
        this.errorAt = false;
        this.statUpdated = true;
        console.log(response);
      },
      (error) => {
        if (error.status === 200) {
          this.statUpdated = true;
          this.errorAt = false;
          this.loading = false;
        }
        else {
          this.errorAt = true;
          console.log(error);
        }
      });
  }

  submitNewRes() {
    this.loading = true;
    this.errorAt = false;
    const selected = this.member_emails[this.posicao];
    const path = '/adm/teams/' + this.id + '/set-responsible-member?memberEmail=' + selected;
    let json = {}
    this.userDataService.handlePost(this.bearer, path, json).subscribe(
      () => {
        this.loading = false;
        this.errorAt = false;
        this.resUpdated = true;
      },
      (error) => {
        if (error.status === 200) {
          this.loading = false;
          this.errorAt = false;
          this.resUpdated = true;
        } else {
          this.errorAt = true;
          this.loading = false;
          console.log(error);
        }
      });
  }

  goBack() {
    this.location.back();
  }

}
