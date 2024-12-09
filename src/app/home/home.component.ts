import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  carritoId: number;

  constructor(private router: Router) {
    this.carritoId = 1;
  }
  goCarrito(): void {
    console.log('Ir al carrito');
    this.router.navigate(['/carrito', this.carritoId]);
  }
}
