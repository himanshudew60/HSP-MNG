import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth';
import Swal from 'sweetalert2';   // ✅ Import SweetAlert2

@Component({
  selector: 'app-changepassword',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './changepassword.html',
  styleUrls: ['./changepassword.css']
})
export class Changepassword implements OnInit {

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  userId: string | null = null;

  ChangeData = {
    password: '',
    confirmPassword: ''
  };

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    console.log('User ID:', this.userId);
  }

  onChangePassword(): void {
    if (!this.ChangeData.password || !this.ChangeData.confirmPassword) {
      Swal.fire('Error', 'Please fill in both fields.', 'error');
      return;
    }

    if (this.ChangeData.password !== this.ChangeData.confirmPassword) {
      Swal.fire('Mismatch', 'Passwords do not match!', 'warning');
      return;
    }

    if (!this.userId) {
      Swal.fire('Error', 'Invalid user ID.', 'error');
      return;
    }

    this.authService.changePassword(this.userId, { password: this.ChangeData.password })
      .subscribe({
        next: (res: any) => {
          console.log('Password change response:', res);
          Swal.fire('Success', 'Password updated successfully!', 'success');
          setTimeout(() => {
            this.router.navigate(['/login']); // ✅ Redirect to login page
          }, 2000);
        },
        error: (err: any) => {
          console.error('Error updating password:', err);
          Swal.fire('Error', 'Something went wrong!', 'error');
        }
      });
  }
}
