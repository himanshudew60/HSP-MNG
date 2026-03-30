import { Component } from '@angular/core';
import { DoctorService } from '../../services/doctor/doctor';
import { PatientService } from '../../services/patient/patient';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { AdminService } from '../../services/admin/admin';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './edit.html',
  styleUrls: ['./edit.css']
})
export class Edit {
  constructor(
    private doctorService: DoctorService,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router,
    private adminService:AdminService
  ) {}

  userId: any;
  userRole: any;
  userData: any = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  ngOnInit() {
    
    this.userId = this.route.snapshot.paramMap.get('id');
    this.userRole = this.route.snapshot.paramMap.get('role');

     this.loadUser(this.userId);
    
  }

  loadUser(id: any) {
      this.adminService.getUserById(id).subscribe((res: any) => {
        console.log(res);
        
        this.userData = { ...res.data, password: '', confirmPassword: '' };
      });
  }

  saveUser() {
    // ✅ Password match validation
    if (this.userData.password !== this.userData.confirmPassword) {
      Swal.fire('⚠️ Warning', 'New password and confirm password do not match!', 'warning');
      return;
    }
    if (this.userRole === '2') {
      this.adminService.updateUser(this.userId, this.userData).subscribe(() => {
        Swal.fire('✅ Success', 'Doctor details updated successfully!', 'success');
        this.router.navigate(['/admin/doctor']);
      });
    } else {
      this.adminService.updateUser(this.userId, this.userData).subscribe(() => {
        Swal.fire('✅ Success', 'Patient details updated successfully!', 'success');
        this.router.navigate(['/admin/patient']);
      });
    }
  }
}
