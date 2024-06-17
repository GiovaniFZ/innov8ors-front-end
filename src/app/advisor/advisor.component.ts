import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersDataService } from '../services/users-data.service';
import { Location, CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner, ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-advisor',
  standalone: true,
  imports: [MatExpansionModule, MatFormFieldModule, MatInputModule, CommonModule, MatButton, MatProgressSpinner],
  templateUrl: './advisor.component.html',
  styleUrl: './advisor.component.css'
})
export class AdvisorComponent {
  constructor(private route: ActivatedRoute, private userDataService: UsersDataService, private router: Router, private location: Location) {}
  panelOpenState: boolean = false;
  phaseName = String(this.route.snapshot.paramMap.get('phaseName'));
  bearer = String(this.route.snapshot.paramMap.get('bearer'));
  teams = this.userDataService.getTeams();
  loading: boolean = false;
  loading2: boolean = false;
  // Propriedades do Progress
  mode: ProgressSpinnerMode = 'indeterminate';
  color = 'primary';
  // Obtendo dados
  id: number[] = [];
  name: number[] = [];
  advisorName: number[] = [];
  status: number[] = [];
  errorAt:boolean = false;

  ngOnInit() {
    for (var i in this.teams) {
      this.id[i] = this.teams[i]["id"];
      this.name[i] = this.teams[i]["name"];
      this.advisorName[i] = this.teams[0]["advisor"]["name"];
      this.status[i] = this.teams[0]["active"];
    }
  }

  seeDetails(i: number){
    this.errorAt = false;
    this.loading = true;
    this.userDataService.handleGet(this.bearer, '/advisor/'+ this.id[i]).subscribe(
      (response) => {    
        this.loading = false;
        this.userDataService.setTeamsDetails(response);
        this.router.navigate(['/proj-details', this.id[i], this.phaseName, this.bearer])
      },
      (error) => {                              
        this.loading = false;
        this.errorAt = true;
        console.log(error);
      }
    );
  }

  changePass(){
    this.router.navigate(['change-password']);
  }

  panelOpened() {
    this.panelOpenState = true;
  }

  goBack(){    
    this.location.back();
  }
}
