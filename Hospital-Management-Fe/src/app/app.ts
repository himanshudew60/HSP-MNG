import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./home/home";
import { AppRoutingModule } from "./app.routes";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'hospital-mng-fe';
}
