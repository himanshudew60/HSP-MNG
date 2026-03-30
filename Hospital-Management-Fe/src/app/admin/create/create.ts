import { Component } from '@angular/core';
import { PatientService } from '../../services/patient/patient';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../../services/doctor/doctor';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService } from '../../services/admin/admin';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './create.html',
  styleUrls: ['./create.css']
})
export class Create {
  constructor(
    private doctorService: DoctorService,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService
  ) {}

  userRole: any;
  userData: any = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  ngOnInit() {
    this.userRole = this.route.snapshot.paramMap.get('role');
  }

  createUser() {
    // 🔹 Check password confirmation before API call
    if (this.userData.password !== this.userData.confirmPassword) {
      Swal.fire('❌ Error', 'Passwords do not match!', 'error');
      return;
    }

    if (this.userRole === '2') {
      this.adminService.createUser(this.userData,this.userRole).subscribe((response: any) => {
        Swal.fire('✅ Success', 'Doctor created successfully!', 'success');
        this.router.navigate(['/admin/doctor']);
      });
    } else {
      this.adminService.createUser(this.userData,this.userRole).subscribe((response: any) => {
        Swal.fire('✅ Success', 'Patient created successfully!', 'success');
        this.router.navigate(['/admin/patient']);
      });
    }
  }
}
