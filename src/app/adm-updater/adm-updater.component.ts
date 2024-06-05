import { Component } from '@angular/core';
import { UsersDataService } from '../services/users-data.service';

@Component({
  selector: 'app-adm-updater',
  templateUrl: './adm-updater.component.html',
  styleUrl: './adm-updater.component.css'
})
export class AdmUpdaterComponent {
  constructor(private userDataService: UsersDataService){}
  json:any;
  id = '';
  name = '';
  membros = '';
  notas = '';
  newName = '';
  
  ngOnInit(){
    this.json = this.userDataService.getTeamsDetails();
    // Dados do json
    this.name = this.json["teamName"];
    this.membros = this.json["members"];
    this.notas = this.json["grades"];
  }
  submitNewName(){
    console.log('teste');
  }
}
