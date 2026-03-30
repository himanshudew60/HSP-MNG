import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth/auth';
import { PatientService } from '../../services/patient/patient';

@Component({
  selector: 'app-patient-home',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive,RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class PatientHome {
  constructor(
    private router: Router,
    private authService: AuthService,
    private patientService:PatientService,
    
  ) {}
  userId:any


  patientName: string | null = '';
  ngOnInit() {
    this.userId = this.authService.getUserId(); 
    this.patientName = this.authService.getUserName();
    this.getPatientDetail();
  }
studentData ='hello';
  logout() {
    // Clear token/role from storage
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    if (this.authService.logout) {
      this.authService.logout();
    }

    // ✅ SweetAlert without confirm button
    Swal.fire({
      icon: 'success',
      title: 'Logged Out',
      text: 'You have been successfully logged out.',
      timer: 1300,
      timerProgressBar: true,
      showConfirmButton: false
    }).then(() => {
      // Redirect after alert closes
      this.router.navigate(['/login']);
    });
  }

  patientFieldList: any = [
    { fieldName:'age' ,inputType:'number',label:'Age' },
    { fieldName:'gender' ,inputType:'select',label:'Gender' },
    { fieldName:'contact' ,inputType:'number',label:'Contact Number' },
    { fieldName:'address' ,inputType:'text',label:'Address' },
    { fieldName:'medical_hestory' ,inputType:'text',label:'Medical Hesotry' },
    { fieldName:'profile_pic' ,inputType:'file',label:'Profile Photo' },
  ]
   getPatientDetail() {
  this.patientService.getPatientDetail(this.userId).subscribe((res: any) => {
    console.log(res.data);

    if (res.data == null || res.data == "" || res.data == undefined) {
      Swal.fire({
        title: 'Complete Your Profile',
        text: 'Your profile is incomplete. Would you like to update it now?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Update',
        cancelButtonText: 'Later',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem("patientFields", JSON.stringify(this.patientFieldList));
          localStorage.setItem("userId", this.userId);
          this.router.navigateByUrl('/patient/formapply');
        }
      });
    }
  });
}
  
}
