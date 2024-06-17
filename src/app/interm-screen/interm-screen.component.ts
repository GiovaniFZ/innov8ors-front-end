import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UsersDataService } from '../services/users-data.service';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-interm-screen',
  templateUrl: './interm-screen.component.html',
  styleUrl: './interm-screen.component.css'
})
export class IntermScreenComponent {
  constructor(private route: ActivatedRoute, private router: Router, private userDataService: UsersDataService) { }
  name = this.route.snapshot.paramMap.get('name');
  bearer = this.route.snapshot.paramMap.get('bearer');
  role = this.route.snapshot.paramMap.get('role');
  errorAt:boolean = false;
  loading: boolean = false;
  errorMessage: string = '';
  // Progress Spinner
  color = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';

  handleAdvisor(bearer: any){
      let phaseName = '';
      let teams = [];
      this.loading = true;
      this.errorMessage = "";
      this.errorAt = false;
      this.userDataService.handleAdvisor(bearer).subscribe(
          (response) => {    
            this.loading = false;
            phaseName = response["fetinPhase"]["phaseName"];
            teams = response["teams"];
            this.userDataService.setTeams(teams);
            this.router.navigate(['/advisor', phaseName, bearer]);
          },
          (error) => {                              
            console.error('Request failed with error');
            this.errorAt = true;
            this.errorMessage = error;
            this.loading = false;
          },
          () => {                                 
            console.log('Request completed')      
            this.loading = false; 
          })
    }

    handleStudent(bearer: any){
      this.loading = true;
      this.errorMessage = "";
      let phaseName = '';
      let teams = [];
      this.errorAt = false;
      this.userDataService.handleStudent(bearer)
        .subscribe(
          (response) => {    
            teams = response["teams"];
            phaseName = response["fetinPhase"]["phaseName"];
            this.userDataService.setTeams(teams);
            this.router.navigate(['/student', phaseName, bearer]);
          },
          (error) => {                              
            console.error('Request failed with error')
            this.errorMessage = error;
            this.loading = false;
            this.errorAt = true;
          });
    }

  handleAdm(bearer: any){
    this.errorAt = false;
    this.loading = true;
    this.userDataService.handleGet(bearer, '/adm/teams')
        .subscribe(
          (response) => {    
            this.userDataService.setTeamsDetails(response);
            this.loading = false;
            this.router.navigate(['/adm-teams', this.bearer, this.name]);
          },
          (error) => {                              
            console.error('Request failed with error')
            this.errorMessage = error;
            this.loading = false;
            this.errorAt = true;
          });
    }

  goToPage() {
    if (this.role == '[ROLE_ADMIN]') {
      this.handleAdm(this.bearer);
    } else {
      if (this.role == '[ROLE_ADVISOR]') {
        this.handleAdvisor(this.bearer);
      } else {
        this.handleStudent(this.bearer);
      }
    }
  }
}
