import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICarrito } from '../models/shopping-car.model';
import { IProducto } from '../models/product.model';
import { MyApiService } from '../service/my-api.service';

@Component({
  selector: 'app-shopping-car',
  templateUrl: './shopping-car.component.html',
  styleUrls: ['./shopping-car.component.css']
})
export class ShoppingCarComponent implements OnInit {
  carrito: ICarrito = {
    _id: '',
    idCliente: '',
    cantidad_productos: 0,
    productos: [],
    precioTotal: 0
  };
  product: IProducto = {
    _id: '',
    producto: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    categoria: '',
    agotado: false,
    cantidadCarrito: 0
  };

  constructor(private route: ActivatedRoute, private _myApiService: MyApiService) { }

  removeProductFromCarrito(producto: string): void {
    const carritoActual = sessionStorage.getItem("carritoActual");
    if (carritoActual) {
      this._myApiService.removeProductFromCarrito(carritoActual, producto).subscribe({
        next: (updatedCarrito) => {
          this._myApiService.mostrarAlerta('success', `Se ha eliminado ${producto} del carrito`);
          this.carrito = updatedCarrito;
        },
        error: (error) => {
          this._myApiService.mostrarAlerta('error', error.error.message);
          console.error('Error al eliminar producto del carrito:', error.error.message);
        }
      });
    }
  }

  ngOnInit(): void {
    this.carrito._id = this.route.snapshot.paramMap.get('carritoId') || '';
    this._myApiService.getCarrito(this.carrito._id).subscribe({
      next: (data: ICarrito) => {
        this.carrito = data;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
}
