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

@Component({
  selector: 'app-adm-fetin-stages',
  standalone: true,
  imports: [
    MatExpansionModule, 
    MatFormFieldModule,MatButton,
    CommonModule, 
    FormsModule,
    MatInput,
    MatIconModule],
  templateUrl: './adm-fetin-stages.component.html',
  styleUrl: './adm-fetin-stages.component.css',
})
export class AdmFetinStagesComponent {
  constructor(private userDataService: UsersDataService, private location: Location){}
  panelOpenState: boolean = false;

  phases = this.userDataService.getFetinStages();
  phaseName: String[] = [];
  id: number[] = [];
  startDate: String[] = [];
  endDate: String[] = [];

  ngOnInit(){
    for (var i in this.phases) {
      this.id[i] = this.phases[i]["id"];
      this.phaseName[i] = this.phases[i]["name"];
      this.startDate[i] = this.phases[i]["start"];
      this.endDate[i] = this.phases[i]["endDate"];
    }
  }

  goBack(){
    this.location.back();
  }
}
