import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  LoginData = {
    email: '',
    password: ''
  };

  onSubmit() {
    this.authService.login(this.LoginData.email, this.LoginData.password).subscribe({
      next: () => {
        // ✅ Login successful, now fetch role from AuthService
        const role = this.authService.getRole();

        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Redirecting...',
          timer: 1300,
          timerProgressBar: true,
          showConfirmButton: false
        }).then(() => {
          if (role === 1) {
            this.router.navigate(['/patient']);
          } else if (role === 2) {
            this.router.navigate(['/doctor']);
          } else if (role === 0) {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/login']); // fallback
          }
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: err.error?.message || 'Invalid email or password',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      }
    });
  }
}
