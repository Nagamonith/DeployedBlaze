import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-unauthorized-component',
  imports: [],
  templateUrl: './unauthorized-component.component.html',
  styleUrl: './unauthorized-component.component.css'
})
export class UnauthorizedComponent{

  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/pre-dashboard']); // or any default route you prefer
  }
}
