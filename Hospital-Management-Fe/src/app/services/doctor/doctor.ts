import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
    constructor(private http: HttpClient, private router: Router) {}
    private baseUrl = 'http://127.0.0.1:8000/api'; // Laravel API URL


    
    getDoctorById(id: number) {
        return this.http.get(`${this.baseUrl}/doctors/${id}`);
    }

    createDoctor(doctor: any) {
        return this.http.post(`${this.baseUrl}/doctors`, doctor);
    }

    updateDoctor(id: number, doctor: any) {
        return this.http.post(`${this.baseUrl}/doctors/${id}`, doctor);
    }

    deleteDoctor(id: number) {
        return this.http.delete(`${this.baseUrl}/doctors/${id}`);
    }
}
