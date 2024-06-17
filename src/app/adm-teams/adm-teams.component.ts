import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersDataService } from '../services/users-data.service';
import { Location } from '@angular/common';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-adm',
  templateUrl: './adm-teams.component.html',
  styleUrl: './adm-teams.component.css'
})
export class AdmComponent {
  panelOpenState: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private userDataService: UsersDataService, private location: Location) {}
  name = this.route.snapshot.paramMap.get('name');
  bearer = String(this.route.snapshot.paramMap.get('bearer'));
  teams = this.userDataService.getTeamsDetails();
  loading: boolean = false;
  loading2: boolean = false;
  teams_names:any;
  teamIds:any;
  errorAt:boolean = false;
  errorMessage: string = '';

  // Progress Spinner
  color = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';

  // Menu
  selectedTeam: string = 'Selecione um time';
  posicao:number = 0;

  selectTeam(team: string, posicao:number) {
    this.selectedTeam = team;
    this.posicao = posicao;
  }

  ngOnInit(){
    let arr = [];
    let arr2:any;
    let arr1:any;
    arr = Object.entries(this.teams);
    arr1 = arr[0][0];
    arr2 = arr[0][1]; // Nomes dos times
    this.teams_names = Object.values(arr2);
    this.teamIds = Object.keys(arr2);
  }

  updateData(){
    this.loading = true;
    this.errorAt = false;
    let idTeam = this.teamIds[this.posicao];
    this.userDataService.handleGet(this.bearer, '/adm/teams/' + idTeam).subscribe(
      (response) => {    
        this.userDataService.setTeamsDetails(response);
        this.router.navigate(['/adm-proj-details', this.bearer]);
      },
      (error) => {                              
        this.loading = false;
        console.log(error);
      }
    );
  }
  createProject(){
    this.router.navigate(['/create-proj', this.bearer])
  }
  checkStages(){
    this.loading = true;
    this.errorAt = false;
    this.userDataService.handleGet(this.bearer, '/adm/fetin-stages').subscribe(
      (response) => {    
        this.loading = false;
        this.userDataService.setFetinStages(response["phases"]);
        this.router.navigate(['/adm-fetinStages', this.bearer, this.name]);
      },
      (error) => {                              
        this.loading = false;
        this.errorAt = true;
        console.log(error);
      }
    );
  }

  goBack(){
    this.location.back();
  }

}
