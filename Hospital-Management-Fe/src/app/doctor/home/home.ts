import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth/auth';
@Component({
  selector: 'app-home',
  imports: [RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class DoctorHome {
constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  doctorName :any
  ngOnInit() {
    this.doctorName = this.authService.getUserName();
  }

  logout() {
    // Clear token/role from storage
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    if (this.authService.logout) {
      this.authService.logout();
    }

    // ✅ SweetAlert without confirm button
    Swal.fire({
      icon: 'success',
      title: 'Logged Out',
      text: 'You have been successfully logged out.',
      timer: 1300,
      timerProgressBar: true,
      showConfirmButton: false
    }).then(() => {
      // Redirect after alert closes
      this.router.navigate(['/login']);
    });
  }
}
