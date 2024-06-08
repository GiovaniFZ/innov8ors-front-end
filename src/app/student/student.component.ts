import { Component } from '@angular/core';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersDataService } from '../services/users-data.service';
import { Location, CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [MatExpansionModule, MatAccordion, MatButton, CommonModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})

export class StudentComponent {
  constructor(private route: ActivatedRoute, private userDataService: UsersDataService, private router: Router, private location: Location) { }
  panelOpenState: boolean = false;
  // Obtendo dados
  teams = this.userDataService.getTeams();
  phaseName = String(this.route.snapshot.paramMap.get('phaseName'));
  bearer = String(this.route.snapshot.paramMap.get('bearer'));
  loading: boolean = false;

  id: number[] = [];
  name: number[] = [];
  advisorName: number[] = [];
  status: number[] = [];

  ngOnInit() {
    for (var i in this.teams) {
      this.id[i] = this.teams[i]["id"];
      this.name[i] = this.teams[i]["name"];
      this.advisorName[i] = this.teams[i]["advisor"]["name"];
      this.status[i] = this.teams[i]["active"];
    }
  }

  seeDetails(i: number){
    this.loading = true;
    this.userDataService.handleGet(this.bearer, '/member/'+ this.id[i]).subscribe(
      (response) => {    
        this.loading = false;
        this.userDataService.setTeamsDetails(response);
        this.router.navigate(['/proj-details', this.id[i]])
      },
      (error) => {                              
        this.loading = false;
        console.log(error);
      }
    );
  }

  goBack(){
    this.location.back();
  }

}
