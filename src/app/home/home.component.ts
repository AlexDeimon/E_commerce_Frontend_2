import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
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

  constructor(private _myApiService: MyApiService) {}

  mostrarAlerta(icon:any, title:string): void {
    Swal.fire({ icon, title });
  }

  goCarrito(): void {
    this._myApiService.goCarrito();
  }

  ngOnInit(): void {
    const carritoActual = sessionStorage.getItem("carritoActual");
    if (!carritoActual) {
      this._myApiService.newShoppingCar().subscribe(response => {
        this.carrito = response;
        sessionStorage.setItem("carritoActual", this.carrito._id);
      });
    } else {
      this.carrito._id = JSON.parse(carritoActual);
    }
    this._myApiService.getAllProducts().subscribe((data: IProducto[]) => {
      this.productsList = data;
    });
  }
}
