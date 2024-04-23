import { RouterModule, Routes } from '@angular/router';
import { AdvisorComponent } from './advisor/advisor.component';
import { AuthComponent } from './auth/auth.component';
import { StudentComponent } from './student/student.component';
import { AdmComponent } from './adm/adm.component';
import { UpdaterComponent } from './updater/updater.component';
import { NgModule } from '@angular/core';

const routes: Routes = [    
    { path: 'auth', component: AuthComponent },
    { path: 'advisor', component: AdvisorComponent },
    { path: 'student', component: StudentComponent },
    { path: 'adm', component:AdmComponent },
    { path:'updater', component:UpdaterComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }