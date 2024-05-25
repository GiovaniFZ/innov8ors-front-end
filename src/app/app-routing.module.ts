import { RouterModule, Routes } from '@angular/router';
import { AdvisorComponent } from './advisor/advisor.component';
import { AuthComponent } from './auth/auth.component';
import { StudentComponent } from './student/student.component';
import { AdmComponent } from './adm/adm.component';
import { UpdaterComponent } from './updater/updater.component';
import { NgModule } from '@angular/core';
import { ProjCreatorComponent } from './proj-creator/proj-creator.component';

const routes: Routes = [    
    { path: 'auth', component: AuthComponent },
    { path: 'advisor/:bearer', component: AdvisorComponent },
    { path: 'student/:bearer', component: StudentComponent },
    { path: 'adm/:name', component:AdmComponent },
    { path: 'updater', component:UpdaterComponent },
    { path: 'create-proj', component:ProjCreatorComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }