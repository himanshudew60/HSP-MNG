import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/guards/auth/auth-guard';
import { AdminGuard } from '../app/guards/admin/admin-guard';
import { PatientGuard } from '../app/guards/patient/patient-guard';
import { DoctorGuard } from '../app/guards/doctor/doctor-guard';

import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { AdminDashboard } from './admin/dashboard/dashboard';
import { PatientDashboard } from './patient/dashboard/dashboard';
import { DoctorDashboard } from './doctor/dashboard/dashboard';
import { Home } from './home/home';
import { Doctor } from './admin/doctor/doctor';
import { Patient } from './admin/patient/patient';
import { AdminHome } from './admin/home/home';
import { DoctorHome } from './doctor/home/home';
import { PatientHome } from './patient/home/home';
import { Edit } from './admin/edit/edit';
import { Create } from './admin/create/create';
import { Appointments } from './admin/appointments/appointments';

import { Changepassword } from './auth/changepassword/changepassword';
import { Forgotpassword } from './auth/forgotpassword/forgotpassword';
import { Formapply } from './shared/formapply/formapply';

export const routes: Routes = [
  {
    path: '', 
    component: Home, 
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      { path: 'forgot-password', component: Forgotpassword },
      { path: 'change-password/:id', component: Changepassword }
    ]
  },

  // ✅ Admin routes with children
  { 
    path: 'admin', 
    component: AdminHome, 
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // default admin child
      { path: 'dashboard', component: AdminDashboard },
      { path: 'doctor', component: Doctor },
      { path: 'patient', component: Patient },
      { path: 'appointments', component: Appointments },
      { path: 'edit/:id/:role', component: Edit },
      { path: 'create/:role', component: Create }
    ] 
  },

  // ✅ Doctor dashboard
  { 
    path: 'doctor', 
    component: DoctorHome, 
    canActivate: [DoctorGuard], 
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // default doctor child
      { path: 'dashboard', component: DoctorDashboard },
      { path:'formapply',component:Formapply }
    ]
  },

  // ✅ Patient dashboard
  { path: 'patient', 
    component: PatientHome, 
    canActivate: [PatientGuard], 
    children: [
       { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // default patient child
      { path: 'dashboard', component: PatientDashboard },
      { path:'formapply',component:Formapply }
    ]
  },

  

  // ✅ Fallback
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
