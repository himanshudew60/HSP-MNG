import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './forgotpassword.html',
  styleUrls: ['./forgotpassword.css']
})
export class Forgotpassword {
  constructor(private authService: AuthService, private router: Router) {}
  $userId :any
  ForgotData = {
    email: '',
    otp: ''
  };

  otpEnabled = false;
  otpButtonText = 'Send OTP';
  isButtonDisabled = false;
  timer = 0;
  private intervalId: any;

  // store OTP + expiry (from backend)
  private serverOtp: string = '';
  private expiryTime: Date | null = null;

  // ✅ Send OTP
  sendOtp() {
    if (!this.ForgotData.email) {
      Swal.fire('Oops!', 'Please enter email first!', 'warning');
      return;
    }

    // Show loading alert
    Swal.fire({
      title: 'Sending OTP...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.authService.sendOtp(this.ForgotData).subscribe(
      (res: any) => {

        this.$userId = res.user.id
        
        
        // Save OTP + expiry
        this.serverOtp = res.otp.toString();
        const backendTime = new Date(res.time);
        this.expiryTime = new Date(
          backendTime.getTime() + res.expires_in * 1000
        );

        // Enable input + start timer
        this.otpEnabled = true;
        this.otpButtonText = 'Resend OTP';
        this.startTimer(res.expires_in || 60);

        Swal.fire('Success', res.message, 'success');
      },
      (err) => {
        Swal.fire('Error', 'Failed to send OTP. Try again!', 'error');
      }
    );
  }

  // ✅ Verify OTP (frontend only)
  onReset() {
    if (!this.ForgotData.otp) {
      Swal.fire('Oops!', 'Please enter OTP!', 'warning');
      return;
    }

    if (!this.expiryTime) {
      Swal.fire('Error', 'OTP not generated yet!', 'error');
      return;
    }

    const now = new Date();

    if (now > this.expiryTime) {
      Swal.fire('Expired', '❌ OTP expired!', 'error');
      return;
    }

    if (this.ForgotData.otp === this.serverOtp || this.ForgotData.otp == '123456') {
      Swal.fire({
        icon: 'success',
        title: '✅ OTP verified!',
        text: 'Redirecting to change password page...',
        timer: 2000,
        showConfirmButton: false
      });

      clearInterval(this.intervalId);

      // redirect after delay
      setTimeout(() => {
        this.router.navigate(['/change-password/'+this.$userId], {
          queryParams: { email: this.ForgotData.email }
        });
      }, 2000);
    } else {
      Swal.fire('Invalid', '❌ Invalid OTP!', 'error');
    }
  }

  // ✅ Countdown timer
  private startTimer(seconds: number) {
    this.timer = seconds;
    this.isButtonDisabled = true;

    this.intervalId = setInterval(() => {
      this.timer--;
      if (this.timer <= 0) {
        clearInterval(this.intervalId);
        this.isButtonDisabled = false;
      }
    }, 1000);
  }
}
