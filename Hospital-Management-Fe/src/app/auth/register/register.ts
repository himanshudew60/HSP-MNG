import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  registerData = {
    name: '',
    email: '',
    password: ''
  };

  onSubmit() {
    this.authService.register(this.registerData).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'You can now log in with your credentials!',
          confirmButtonText: 'Go to Login'   // ✅ correct usage
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: err.error?.message || 'Something went wrong. Please try again.'
        });
      }
    });
  }
}
