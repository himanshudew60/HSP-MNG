import { Component } from '@angular/core';
import { DoctorService } from '../../services/doctor/doctor';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService } from '../../services/admin/admin';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './doctor.html',
  styleUrls: ['./doctor.css']
})
export class Doctor {
  constructor(private adminService: AdminService) {}

  doctors: any[] = [];

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.adminService.DashboardData().subscribe((res: any) => {

      this.doctors = res.doctors;
    });
  }

  deleteDoctor(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This Doctor will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteUser(id).subscribe(() => {
          this.loadDoctors();
          Swal.fire('Deleted!', 'Doctor has been deleted.', 'success');
        });
      }
    });
  }

  updateDoctor(doctor: any) {
    this.adminService.updateUser(doctor.id, doctor).subscribe(() => {
      this.loadDoctors();
      Swal.fire('Updated!', 'Doctor details updated successfully.', 'success');
    });
  }
}
