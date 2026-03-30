import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = 'http://127.0.0.1:8000/api'; // Laravel API URL

  constructor(private http: HttpClient, private router: Router) {}

  // Book new appointment
  bookAppointment(appointmentData: any) {
    return this.http.post(`${this.baseUrl}/appointments`, appointmentData);
  }

  // Get all appointments of a patient
  getPatientAppointments(patient_id: any) {
    return this.http.get(`${this.baseUrl}/appointments/patient/${patient_id}`);
  }

  // Get all appointments of a doctor
  getDoctorAppointments(doctor_id: number) {
    return this.http.get(`${this.baseUrl}/appointments/doctor/${doctor_id}`);
  }

  // Cancel appointment
  cancelAppointment(appointment_id: number) {
    return this.http.delete(`${this.baseUrl}/appointments/${appointment_id}`);
  }

  // Update appointment status (confirm, complete, cancel etc.)
  updateAppointmentStatus(id: number, status: number) {
    return this.http.put(`${this.baseUrl}/appointments/${id}/status`, { status });
  }

  // Reschedule appointment
  rescheduleAppointment(id: number, newDateTime: string) {
    return this.http.put(`${this.baseUrl}/appointments/${id}/reschedule`, {
      appointment_time: newDateTime
    });
  }
}
