import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private http: HttpClient, private router: Router) {}
    private baseUrl = 'http://127.0.0.1:8000/api'; // Laravel API URL


    getDoctors(){
        return this.http.get(`${this.baseUrl}/get-doctors`);
    }

    getPatients() {
        return this.http.get(`${this.baseUrl}/patients`);
    }

    getPatientDetail(id: number) {
        return this.http.get(`${this.baseUrl}/get-patient-detail/${id}`);
    }

    createPatient(patient: any) {
        return this.http.post(`${this.baseUrl}/patients`, patient);
    }

    updatePatient(id: number, patient: any) {
        return this.http.post(`${this.baseUrl}/patients/${id}`, patient);
    }

    deletePatient(id: number) {
        return this.http.delete(`${this.baseUrl}/patients/${id}`);
    }
}
