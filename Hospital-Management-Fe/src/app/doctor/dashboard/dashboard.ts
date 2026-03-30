import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AppointmentService } from '../../services/appointment/appointment';
import { AuthService } from '../../services/auth/auth';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-doctor-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DoctorDashboard {
  doctorAppointments: any[] = [];

  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    const doctorId = this.authService.getUserId();
    if (doctorId) {
      this.appointmentService.getDoctorAppointments(doctorId).subscribe({
        next: (res: any) => {
          this.doctorAppointments = res.data || [];
        },
        error: () => {
          Swal.fire('❌ Error', 'Failed to load appointments!', 'error');
        }
      });
    }
  }

  updateStatus(id: number, status: number, label: string) {
    this.appointmentService.updateAppointmentStatus(id, status).subscribe({
      next: () => {
        Swal.fire('✅ Success', `Appointment ${label} successfully!`, 'success');
        this.loadAppointments();
      },
      error: () => {
        Swal.fire('❌ Error', `Failed to ${label.toLowerCase()} appointment!`, 'error');
      }
    });
  }

  reschedule(id: number, currentTime?: string) {
  // ✅ Fix local time conversion (instead of UTC .toISOString())
  const currentDateTime = currentTime
    ? this.formatLocalDateTime(new Date(currentTime))
    : '';
  const minDateTime = this.formatLocalDateTime(new Date());

  Swal.fire({
    title: '🔄 Reschedule Appointment',
    html: `
      <input type="datetime-local" id="newDateTime" class="swal2-input"
        value="${currentDateTime}" min="${minDateTime}" />
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
      this.appointmentService.rescheduleAppointment(id, result.value).subscribe({
        next: () => {
          Swal.fire('✅ Success', 'Appointment rescheduled successfully!', 'success');
          this.loadAppointments();
        },
        error: () => {
          Swal.fire('❌ Error', 'Failed to reschedule appointment!', 'error');
        }
      });
    }
  });
}

// ✅ Reuse same helper
private formatLocalDateTime(date: Date): string {
  const pad = (n: number) => (n < 10 ? '0' + n : n);

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
}
