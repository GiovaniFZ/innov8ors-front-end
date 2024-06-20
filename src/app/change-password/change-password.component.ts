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
  constructor(private route: ActivatedRoute, private location: Location, private userDataService: UsersDataService) { }
  loading: boolean = false;
  loading2: boolean = false;
  errorAt: boolean = false;
  passNotConf:boolean = false;
  passNotAct : boolean = false;
  bearer = String(this.route.snapshot.paramMap.get('bearer'));
  role = this.route.snapshot.paramMap.get('role2');
  errorMessage: string = '';
  passUpdated: boolean = false;
  passController = new FormControl('', Validators.required);
  newPassController = new FormControl('', Validators.required);
  newPassController2 = new FormControl('', Validators.required);
  color = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  // Strings do component
  actPass = '';
  actPass2 = '';
  newPass = '';
  newPassConf = '';

  verify() {
    // Verificar se a senha digitada é a mesma da confirmada e se a senha atual coincide com a digitada
    this.actPass2 = this.userDataService.getPass();
    if(this.actPass != this.actPass2){
      this.passNotAct = true;
      this.passNotConf = false;
    }else if (this.newPass != this.newPassConf) {
      this.passNotAct = false;
      this.passNotConf = true;
    }else{
      this.passNotConf = false;
      this.passNotAct = false;
      this.changePass();
    }
  }

  changePass() {
    let json = {
      "newPassword": this.newPass
    }
    this.passUpdated = false;
    this.errorAt = false;
    this.loading = true;
    this.userDataService.handlePost(this.bearer, this.role + 'change-password', json).subscribe(
      (response) => {
        this.passUpdated = true;
        this.loading = false;
        console.log(response);
      },
      (error) => {
        if (error.status === 200) {
          this.passUpdated = true;
          this.loading = false;
        } else {
          this.errorAt = true;
          this.loading = false;
          console.log(error);
        }
      }
    )
  }

  goBack() {
    this.location.back();
  }
}
