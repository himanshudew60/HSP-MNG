import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { DoctorService } from '../../services/doctor/doctor';
import { AuthService } from '../../services/auth/auth';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../services/appointment/appointment';
import { CommonModule, DatePipe } from '@angular/common';
import { PatientService } from '../../services/patient/patient';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [FormsModule,CommonModule,DatePipe],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class PatientDashboard {
  constructor(
    private doctorService: DoctorService,
    private authService: AuthService,
    private patientService:PatientService,
    private appointmentService: AppointmentService
  ) {}
  
  patientAppointment: any
  userId :any
  doctors: any
  appointmentData = {
    patient_id: '',
    doctor_id: '',
    appointment_time: ''
  };

  ngOnInit() {
    
    this.userId = this.authService.getUserId();    
    this.loadDoctors();
   
    this.getPatientAppointment();
    // ✅ Ensure patient_id is set (works if getUserId returns string or observable)
    const userId = this.authService.getUserId();
    if (typeof userId === 'string') {
      this.appointmentData.patient_id = userId;
    } else if (userId.subscribe) {
      userId.subscribe((id: string) => (this.appointmentData.patient_id = id));
    }
    
  }



 
  loadDoctors() {
    this.patientService.getDoctors().subscribe({
      next: (res: any) => {
        this.doctors = res.data;
      },
      error: () => {
        Swal.fire('❌ Error', 'Failed to load doctors!', 'error');
      }
    });
  }

  getPatientAppointment() {
  const userId = this.authService.getUserId();
  if (typeof userId === 'string') {
    this.appointmentService.getPatientAppointments(userId).subscribe({
      next: (res: any) => {
        console.log('Appointments:', res.data);

        // ✅ Ensure it's always an array
        if (Array.isArray(res.data)) {
          this.patientAppointment = res.data;
        } else if (res.data) {
          this.patientAppointment = [res.data]; // wrap single object into array
        } else {
          this.patientAppointment = [];
        }
      },
      error: () => {
        Swal.fire('❌ Error', 'Failed to load appointments!', 'error');
      }
    });
  }
}

  submit() {
    if (!this.appointmentData.doctor_id || !this.appointmentData.appointment_time) {
      Swal.fire('⚠️ Warning', 'Please select a doctor and time!', 'warning');
      return;
    }

    this.appointmentService.bookAppointment(this.appointmentData).subscribe({
      next: (res: any) => {
        Swal.fire('✅ Success', 'Appointment booked successfully!', 'success');
        this.appointmentData.doctor_id = '';
        this.appointmentData.appointment_time = '';
        this.getPatientAppointment(); // Refresh appointments
      },
      error: () => {
        Swal.fire('❌ Error', 'Something went wrong while booking!', 'error');
      }
    });
  }
  cancelAppointment(id: number) {
  Swal.fire({
    title: '❓ Are you sure?',
    text: 'Do you really want to cancel this appointment?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '✅ Yes, Cancel',
    cancelButtonText: '❌ No, Keep it'
  }).then((result) => {
    if (result.isConfirmed) {
      this.appointmentService.cancelAppointment(id).subscribe({
        next: (res: any) => {
          console.log(res.data);
          Swal.fire('✅ Success', 'Appointment cancelled successfully!', 'success');
          this.getPatientAppointment(); // Refresh appointments
        },
        error: () => {
          Swal.fire('❌ Error', 'Something went wrong while cancelling!', 'error');
        }
      });
    }
  });
}

  private formatLocalDateTime(date: Date): string {
  const pad = (n: number) => (n < 10 ? '0' + n : n);

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
rescheduleAppointment(id: number, currentTime?: string) {
  // ✅ Convert given time to local string for datetime-local input
  const currentDateTime = currentTime
    ? this.formatLocalDateTime(new Date(currentTime))  // local time fix
    : '';

  const minDateTime = this.formatLocalDateTime(new Date()); // today onwards only

  Swal.fire({
    title: '🔄 Reschedule Appointment',
    html: `
      <input type="datetime-local" 
             id="newDateTime" 
             class="swal2-input" 
             value="${currentDateTime}" 
             min="${minDateTime}" />
    `,
    confirmButtonText: '✅ Reschedule',
    showCancelButton: true,
    cancelButtonText: '❌ Cancel',
    preConfirm: () => {
      const newDateTime = (document.getElementById('newDateTime') as HTMLInputElement)?.value;
      if (!newDateTime) {
        Swal.showValidationMessage('⚠️ Please select a new date & time');
        return false;
      }
      return newDateTime;
    }
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      const newTime  = result.value;

      this.appointmentService.rescheduleAppointment(id, newTime).subscribe({
        next: (res: any) => {
          Swal.fire('✅ Success', 'Appointment rescheduled successfully!', 'success');
          this.getPatientAppointment(); // Refresh list
        },
        error: () => {
          Swal.fire('❌ Error', 'Something went wrong while rescheduling!', 'error');
        }
      });
    }
  });
}



}
