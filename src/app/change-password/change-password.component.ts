import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { FormControl, Validators } from '@angular/forms';
import { UsersDataService } from '../services/users-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  constructor(private route: ActivatedRoute, private router: Router, private userDataService: UsersDataService) { }
  loading: boolean = false;
  loading2: boolean = false;
  errorAt: boolean = false;
  bearer = String(this.route.snapshot.paramMap.get('bearer'));
  phaseName = this.route.snapshot.paramMap.get('phaseName');
  errorMessage: string = '';
  passUpdated: boolean = false;
  passController = new FormControl('', Validators.required);
  newPassController = new FormControl('', Validators.required);
  newPassController2 = new FormControl('', Validators.required);
  color = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  // Strings do component
  actPass = '';
  newPass = '';
  newPassConf = '';
  
  goBack(){
    this.loading2 = true;
    let teams = [];
    this.userDataService.handleAdvisor(this.bearer)
        .subscribe(
          (response) => {    
            teams = response["teams"];
            this.userDataService.setTeams(teams);
            this.loading2 = false;
            this.router.navigate(['/advisor', this.phaseName, this.bearer]);
          },
          (error) => {                              
            console.error('Request failed with error')
            this.errorMessage = error;
            this.loading2 = false;
            this.errorAt = true;
          });
  }
}
