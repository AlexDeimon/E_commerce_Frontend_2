import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IProducto } from '../models/product.model';
import { MyApiService } from '../service/my-api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
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

  constructor(private _route: ActivatedRoute, private _myApiService: MyApiService) {}

  addProductToCarrito(): void {
    const carritoActual = sessionStorage.getItem("carritoActual");
    if (carritoActual) {
      const cantidad = this.product.cantidadCarrito;
      this._myApiService.addProductToCarrito(carritoActual, this.product.producto, cantidad).subscribe({
        next: (updatedCarrito) => {
          this._myApiService.mostrarAlerta('success', 'Producto agregado al carrito');
          console.log('Producto agregado al carrito:', updatedCarrito);
        },
        error: (error) => {
          this._myApiService.mostrarAlerta('error', error.error.message);
          console.error('Error al agregar producto al carrito:', error.error.message);
        }
      });
    }
  }

  goCarrito(): void {
    this._myApiService.goCarrito();
  }

  ngOnInit(): void {
    this._route.params.subscribe({
      next: (params: Params) => {
        this._myApiService.getProduct(params['producto']).subscribe({
          next: (data: IProducto) => {
            this.product = data;
          },
          error: (error: any) => {
            console.error(error);
          }
        })
      },
      error: (error: any) => {
        console.error(error);
      }
    })
  }
}
