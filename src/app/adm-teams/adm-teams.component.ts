import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButton } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink, RouterLinkActive, RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { UsersDataService } from '../services/users-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-adm',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatButton, 
    MatExpansionModule, 
    MatFormFieldModule,
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    CommonModule,
    FormsModule,
    MatInputModule],
  templateUrl: './adm-teams.component.html',
  styleUrl: './adm-teams.component.css'
})
export class AdmComponent {
  panelOpenState: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private userDataService: UsersDataService) {}
  name = this.route.snapshot.paramMap.get('name');
  bearer = String(this.route.snapshot.paramMap.get('bearer'));
  teams = this.userDataService.getTeamsDetails();
  loading: boolean = false;
  teams_names:any;
  idTeam:string = '';


  ngOnInit(){
    let arr = [];
    let arr2:any;
    arr = Object.entries(this.teams);
    arr2 = arr[0][1];
    this.teams_names = Object.values(arr2);
    console.log(this.teams_names);
    return this.teams_names;
  }

  updateData(){
    this.loading = true;
    console.log(this.idTeam);
    this.userDataService.handleGet(this.bearer, '/adm/teams/' + this.idTeam).subscribe(
      (response) => {    
        this.userDataService.setTeamsDetails(response);
        this.router.navigate(['/updater', this.bearer]);
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
    this.userDataService.handleGet(this.bearer, '/adm/fetin-stages').subscribe(
      (response) => {    
        this.loading = false;
        this.userDataService.setFetinStages(response["phases"]);
        this.router.navigate(['/adm-fetinStages']);
      },
      (error) => {                              
        this.loading = false;
        console.log(error);
      }
    );
  }

}
