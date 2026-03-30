import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth/auth';  // adjust path if needed
import { AdminService } from '../../services/admin/admin';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class AdminDashboard implements OnInit {
  loading = false;  // ✅ initialized
  DashboardData: any = {};  // ✅ initialized

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loading = true;
    this.loadData();  // ✅ call function on init
  }

 loadData(): void {
  

  this.adminService.DashboardData().subscribe({
    next: (res: any) => {
     

      // ⏳ keep spinner for 1 second before hiding
      setTimeout(() => {
        this.loading = false;
      }, 1000);
       this.DashboardData = res;
    },
    error: (err: any) => {
      console.error('Error loading dashboard data:', err);

      // ⏳ also hide spinner after 1 second on error
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }
  });
}



}
