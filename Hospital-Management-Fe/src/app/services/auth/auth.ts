import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, retry, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:8000/api'; // Laravel API URL
  private tokenKey = 'token';
  private roleKey = 'role';

  constructor(private http: HttpClient, private router: Router) {}

  // =========================
  // ✅ Register
  // =========================
  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  // =========================
  // ✅ Login
  // =========================
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, password })
      .pipe(
        tap(res => {
          if (res.token && res.user) {
            // Save token + user data
            localStorage.setItem(this.tokenKey, res.token);
            localStorage.setItem('id', res.user.id);
            localStorage.setItem(this.roleKey, res.user.role);
            localStorage.setItem('name', res.user.name);
            localStorage.setItem('email', res.user.email);
          }
        })
      );
  }

  // =========================
  // ✅ Logout
  // =========================
  logout(): void {
    const headers = this.getAuthHeaders();

    this.http.post(`${this.baseUrl}/logout`, {}, { headers }).subscribe({
      next: () => {
        this.clearStorage();
        this.router.navigate(['/login']);
      },
      error: () => {
        this.clearStorage();
        this.router.navigate(['/login']);
      }
    });
  }

  // =========================
  // ✅ Fetch Logged-in User
  // =========================
  getUser(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/user`, { headers });
  }

  // =========================
  // ✅ Helpers
  // =========================
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getRole(): number | null {
    const role = localStorage.getItem(this.roleKey);
    return role ? +role : null; // convert string → number
  }

  getUserId(): any {
    return localStorage.getItem('id');
  }

  getUserName(): string | null {
    return localStorage.getItem('name');
  }

  getUserEmail(): string | null {
    return localStorage.getItem('email');
  }

  // =========================
  // 🔒 Private Helpers
  // =========================
  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken() || ''}`
    });
  }

  private clearStorage(): void {
    localStorage.clear();
  }


  sendOtp(Data:any){
    return this.http.post(`${this.baseUrl}/send-otp`,Data);
  }

  changePassword(id:any,data:any){
    return this.http.post(`${this.baseUrl}/change-password/${id}`,data)
  }
}
