import { RouterModule, Routes } from '@angular/router';
import { AdvisorComponent } from './advisor/advisor.component';
import { AuthComponent } from './auth/auth.component';
import { StudentComponent } from './student/student.component';
import { AdmComponent } from './adm-teams/adm-teams.component';
import { AdmProjDetailsComponent } from './adm-proj-details/adm-proj-details.component';
import { NgModule } from '@angular/core';
import { ProjCreatorComponent } from './proj-creator/proj-creator.component';
import { IntermScreenComponent } from './interm-screen/interm-screen.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { ProjDetailsComponent } from './proj-details/proj-details.component';
import { AdmFetinStagesComponent } from './adm-fetin-stages/adm-fetin-stages.component';
import { AdmUpdaterComponent } from './adm-updater/adm-updater.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [    
    { path: 'auth', component: AuthComponent },
    { path: 'advisor/:phaseName/:bearer', component: AdvisorComponent },
    { path: 'student/:name/:phaseName/:bearer', component: StudentComponent },
    { path: 'adm-teams/:bearer/:name', component:AdmComponent },
    { path: 'adm-proj-details/:bearer', component:AdmProjDetailsComponent },
    { path: 'create-proj/:bearer', component:ProjCreatorComponent },
    { path: 'interm-screen/:bearer/:name/:role', component:IntermScreenComponent },
    { path: 'help-page', component:HelpPageComponent },
    { path: 'proj-details/:i/:phaseName/:bearer', component:ProjDetailsComponent },
    { path: 'adm-fetinStages/:bearer/:name', component:AdmFetinStagesComponent },
    { path:'adm-updater/:bearer', component:AdmUpdaterComponent },
    { path: 'change-password/:role2/:bearer', component: ChangePasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }