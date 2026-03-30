import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient, private router: Router) { }
  private baseUrl = 'http://127.0.0.1:8000/api'; // Laravel API URL


  DashboardData() {
    return this.http.get(`${this.baseUrl}/admin-dashboard`)
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/user-destroy/${id}`);
  }

  updateUser(id: number, userData: any) {
    return this.http.put(`${this.baseUrl}/user-update/${id}`, userData);
  }

  getUserById(id: number) {
    return this.http.get(`${this.baseUrl}/user-show/${id}`);
  }

  createUser(userData: any, $role: number) {
    return this.http.post(`${this.baseUrl}/user-create/${$role}`, userData);
  }



}
