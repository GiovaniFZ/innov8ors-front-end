import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersDataService } from '../services/users-data.service';
import { HttpResponse } from '@angular/common/http';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Location } from '@angular/common';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-proj-creator',
  templateUrl: './proj-creator.component.html',
  styleUrl: './proj-creator.component.css'
})
export class ProjCreatorComponent {
  tituloProj: string = '';
  membro1: string = '';
  email1: string = '';
  membro2: string = '';
  email2: string = '';
  membro3: string = '';
  email3: string = '';
  membro4: string = '';
  email4: string = '';
  advisorName: string = '';
  emailAdv: string = '';
  loading: boolean = false;
  errorMessage: string = '';
  attempt: boolean = false;
  not_created: boolean = false;
  mode: ProgressSpinnerMode = 'indeterminate';
  color = 'primary';
  dataExc: any;

  constructor(private userDataService: UsersDataService, private router: ActivatedRoute, private location: Location) { }
  bearer = String(this.router.snapshot.paramMap.get('bearer'));

  async saveProject() {
    this.attempt = false;
    this.not_created = false;
    let jsonProj = {
      "teamName": this.tituloProj,
      "members": [
        {
          "name": this.membro1,
          "email": this.email1
        },
        {
          "name": this.membro2,
          "email": this.email2
        },
        {
          "name": this.membro3,
          "email": this.email3
        },
        {
          "name": this.membro4,
          "email": this.email4
        }
      ],
      "advisor": {
        "name": this.advisorName,
        "email": this.emailAdv
      }
    }
    console.log('json sendo salvo: ', jsonProj);
    this.loading = true;
    try {
      const response = await this.userDataService.tryCreate(jsonProj, this.bearer).toPromise();
      console.log('Response: ', response);
      if (response.status === 201) {
        this.attempt = true;
      } else {
        this.not_created = true;
      }
    } catch (error: any) {
      if (error.status === 201) {
        this.attempt = true;
      } else {
        console.error('Erro ao salvar projeto:', error);
        this.not_created = true;
      }
    } finally {
      this.loading = false;
    }
  }

  onFileChange(event: any) {
    // Converte o XLSX em JSON
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = async (e) => {
      const workbook: XLSX.WorkBook = XLSX.read(fileReader.result, { type: 'binary' });
      const sheetnames = workbook.SheetNames;
      this.dataExc = XLSX.utils.sheet_to_json(workbook.Sheets[sheetnames[0]])
      // Preenchendo os dados do XLSX
      for (let i in this.dataExc) {
        this.attempt = false;
        this.not_created = false;
        this.tituloProj = this.dataExc[i]["Nome"];
        this.membro1 = this.dataExc[i]["Membro 1"];
        this.membro2 = this.dataExc[i]["Membro 2"];
        this.membro3 = this.dataExc[i]["Membro 3"];
        this.membro4 = this.dataExc[i]["Membro 4"];
        this.email1 = this.dataExc[i]["EmailMem1"];
        this.email2 = this.dataExc[i]["EmailMem2"];
        this.email3 = this.dataExc[i]["EmailMem3"];
        this.email4 = this.dataExc[i]["EmailMem4"];
        this.advisorName = this.dataExc[i]["Orientador"];
        this.emailAdv = this.dataExc[i]["OrientEmail"];
        await this.saveProject();
      }
    }
  }

  goBack() {
    this.location.back();
  }

}
