import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, CommonModule } from '@angular/common';
import { UsersDataService } from '../services/users-data.service';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner, ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-adm-fetin-stages',
  standalone: true,
  imports: [
    MatExpansionModule, 
    MatFormFieldModule,MatButton,
    CommonModule, 
    FormsModule,
    MatInput,
    MatProgressSpinner,
    MatIconModule],
  templateUrl: './adm-fetin-stages.component.html',
  styleUrl: './adm-fetin-stages.component.css',
})
export class AdmFetinStagesComponent {
  constructor(private userDataService: UsersDataService, private route: Router, private router: ActivatedRoute){}
  panelOpenState: boolean = false;

  phases = this.userDataService.getFetinStages();
  phaseName: String[] = [];
  id: number[] = [];
  startDate: String[] = [];
  endDate: String[] = [];
  bearer = String(this.router.snapshot.paramMap.get('bearer'));
  name = this.router.snapshot.paramMap.get('name');

  // Progress Spinner
  color = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  errorAt: boolean = false;
  loading: boolean = false;
  loading2: boolean = false;

  ngOnInit(){
    for (var i in this.phases) {
      this.id[i] = this.phases[i]["id"];
      this.phaseName[i] = this.phases[i]["name"];
      this.startDate[i] = this.phases[i]["start"];
      this.endDate[i] = this.phases[i]["endDate"];
    }
  }

  goBack(){
    this.loading2 = true;
    this.userDataService.handleGet(this.bearer, '/adm/teams').subscribe(
      (response) => {
        this.loading2 = false;    
        this.userDataService.setTeamsDetails(response);
        this.route.navigate(['adm-teams', this.bearer, this.name]);
      },
      (error) => {                              
        this.loading2 = false;
        console.log(error);
      }
    );
  }
}
