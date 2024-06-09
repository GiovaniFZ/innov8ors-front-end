import { Component } from '@angular/core';
import { UsersDataService } from '../services/users-data.service';
import { Router } from '@angular/router';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls:['./auth.component.css']
})
export class AuthComponent {
  textoUsuario: string = '';
  senhaUsuario: string = ''
  attempt: boolean = false;
  loading: boolean = false;
  repos: string[] = [];
  role: string = '';
  name: string = '';
  bearer = '';
  color = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  nameController = new FormControl('', Validators.required);
  passController = new FormControl('', Validators.required);
  errorMessage: string = '';
  constructor(private router: Router, private userDataService: UsersDataService) {}

  verificarUser() {
    this.attempt = false;
    this.loading = true;
    this.userDataService.tryLogin(this.textoUsuario, this.senhaUsuario).subscribe(
      (response: any) =>{
        this.repos = response;
        this.role = response["User"]["role"];
        this.name = response["User"]["email"];
        this.bearer = response["Bearer"];

        this.router.navigate(['/interm-screen', this.bearer, this.name, this.role]);
      },
      (error) => {
        console.error('Request failed with error');
        this.errorMessage = error;
        this.loading = false;
        this.attempt = true;
      });
  }

}
