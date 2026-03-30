import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AppRoutingModule } from "../../app.routes";

@Component({
  selector: 'app-formapply',
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './formapply.html',
  styleUrl: './formapply.css'
})
export class Formapply {
router: any;
onSubmit() {
throw new Error('Method not implemented.');
}
onFileSelect($event: Event,_t3: any) {
throw new Error('Method not implemented.');
}
patientFields: any[] = [];
  userId: any;

  constructor() {
  const storedFields = localStorage.getItem("patientFields");
  const storedUserId = localStorage.getItem("userId");

  if (storedFields) {
    this.patientFields = JSON.parse(storedFields);
  }
  if (storedUserId) {
    this.userId = storedUserId;
  }
}

}
