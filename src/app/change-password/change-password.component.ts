import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  constructor(private location: Location) { }
  loading: boolean = false;
  errorAt: boolean = false;
  passUpdated: boolean = false;
  color = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  
  goBack(){
    this.location.back();
  }
}
