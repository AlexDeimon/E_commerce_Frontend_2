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

  constructor(private _route: ActivatedRoute, private _myApiService: MyApiService, private router: Router) {}

  addProductToCarrito(): void {
    const carritoActual = sessionStorage.getItem("carritoActual");
    if (carritoActual && this.product) {
      const carrito = JSON.parse(carritoActual);
      const cantidad = this.product.cantidadCarrito;
      this._myApiService.addProductToCarrito(carrito._id, this.product.producto, cantidad).subscribe({
        next: (updatedCarrito) => {
          console.log('Producto agregado al carrito:', updatedCarrito);
        },
        error: (error) => {
          console.error('Error al agregar producto al carrito:', error);
        }
      });
    } else {
      console.error('No se encontró el carrito en sessionStorage o el producto no está definido');
    }
  }

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
