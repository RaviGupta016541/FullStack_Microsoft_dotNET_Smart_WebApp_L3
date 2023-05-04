import { transition } from '@angular/animations';
import { JsonPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AdminDashboardComponent } from './Admin-dashboard/Admin-dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MakeTransactionComponent } from './make-transaction/make-transaction.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ValidAdminAuthGuardGuard } from './valid-admin-auth-guard.guard';
import { ValidUserAuthGuardGuard } from './valid-user-auth-guard.guard';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"profile",component:ProfileComponent,canActivate:[ValidUserAuthGuardGuard]},
  {path:"register",component:RegisterComponent},
  // {path:"makeTransaction",component:MakeTransactionComponent},
  {path:"makeTransaction",component:MakeTransactionComponent,canActivate:[ValidUserAuthGuardGuard]},
  {path:"showTransaction",component:TransactionComponent,canActivate:[ValidUserAuthGuardGuard]},
  {path:"adminDashbord",component:AdminDashboardComponent,canActivate:[ValidAdminAuthGuardGuard]},
  {path:"aboutus",component:AboutusComponent},
  {path:"home",component:HomeComponent},
  {path:"reset",component:ResetPasswordComponent,canActivate:[ValidUserAuthGuardGuard]},
  {path:"",redirectTo:"home",pathMatch:'full'},
  {path:"**",component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
