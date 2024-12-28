import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProducto } from '../models/product.model';
import { ICarrito } from '../models/shopping-car.model';
import { MyApiService } from '../service/my-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  carrito: ICarrito = {
    _id: '',
    idCliente: '',
    cantidad_productos: 0,
    productos: [],
    precioTotal: 0
  };
  productsList: IProducto[] = [];

  constructor(private router: Router, private _myApiService: MyApiService) {}

  goCarrito(): void {
    const carritoActual = sessionStorage.getItem("carritoActual");
    if (carritoActual) {
      const carrito = JSON.parse(carritoActual);
      this.router.navigate(['/carrito', carrito._id]);
    } else {
      console.error('No se encontró el carrito en sessionStorage');
    }
  }

  ngOnInit(): void {
    const carritoActual = sessionStorage.getItem("carritoActual");
    if (!carritoActual) {
      this._myApiService.newShoppingCar().subscribe(response => {
        this.carrito = response;
        sessionStorage.setItem("carritoActual", JSON.stringify(this.carrito));
      });
    } else {
      this.carrito = JSON.parse(carritoActual);
    }
    this._myApiService.getAllProducts().subscribe((data: IProducto[]) => {
      this.productsList = data;
    });
  }
}
