import { Component } from '@angular/core';
import { PatientService } from '../../services/patient/patient';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService } from '../../services/admin/admin';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './patient.html',
  styleUrls: ['./patient.css']
})
export class Patient {
  constructor(private adminService: AdminService ) {}

  patients: any[] = [];

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    this.adminService.DashboardData().subscribe((res: any) => {
    
      
      this.patients = res.patients;
    });
  }

  deletePatient(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This Patient will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteUser(id).subscribe(() => {
          this.loadPatients();
          Swal.fire('Deleted!', 'Patient has been deleted.', 'success');
        });
      }
    });
  }

  updatePatient(patient: any) {
    this.adminService.updateUser(patient.id, patient).subscribe(() => {
      this.loadPatients();
      Swal.fire('Updated!', 'Patient details updated successfully.', 'success');
    });
  }
}
