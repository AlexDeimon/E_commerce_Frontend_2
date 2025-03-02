import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICarrito } from '../models/shopping-car.model';
import { IProducto } from '../models/product.model';
import { ICliente } from '../models/client.model';
import { MyApiService } from '../service/my-api.service';
import { StorageService } from '../service/storage.service';

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
    cantidadCarrito: 0,
    imagen: ''
  };
  client: ICliente = {
    _id:      '',
    nombre:   '',
    apellidos:'',
    direccion:'',
    telefono: '',
    correo:   '',
    compras:  []
  };
  loading = true;
  imagesLoaded = 0;


  constructor(private route: ActivatedRoute, private _myApiService: MyApiService, private _storageService:StorageService, private router:Router) { }

  removeProductFromShoppingCar(producto: string): void {
    const carritoActual = sessionStorage.getItem("carritoActual");
    if (carritoActual) {
      this._myApiService.removeProductFromShoppingCar(carritoActual, producto).subscribe({
        next: (updatedCarrito) => {
          this.carrito = updatedCarrito;
          if(this.carrito.cantidad_productos === 0) {
            this.router.navigate(['/']);
          } else {
            this._myApiService.mostrarAlerta('success', `Se ha eliminado ${producto} del carrito`);
            this.getCarrito();
          }
        },
        error: (error) => {
          this._myApiService.mostrarAlerta('error', error.error.message);
          console.error('Error al eliminar producto del carrito:', error.error.message);
        }
      });
    }
  }

  validateClient(clienteId: string): Boolean {
    if (!clienteId || clienteId.trim() === '') {
      this._myApiService.mostrarAlerta('error', 'Debes digitar un número de Identificación');
      return false;
    } if (!/^[0-9]+$/.test(clienteId)) {
      this._myApiService.mostrarAlerta('error', 'El número de Identificación debe contener solo números');
      return false;
    } if (clienteId.length < 10 || clienteId.length > 12) {
      this._myApiService.mostrarAlerta('error', 'El número de Identificación debe tener entre 10 y 12 dígitos');
      return false;
    } else {
      return true;
    }
  }

  getClientComponent(clienteId: string): void {
    if (this.validateClient(clienteId)) {
      this._myApiService.getClientComponent(clienteId)
    }
  }

  imageLoaded(): void {
    this.imagesLoaded++;
    if (this.imagesLoaded === this.carrito.cantidad_productos) {
      this.loading = false;
    }
  }

  getCarrito(): void {
    this.carrito._id = this.route.snapshot.paramMap.get('carritoId') || '';
    this._myApiService.getShoppingCar(this.carrito._id).subscribe({
      next: (data: ICarrito) => {
        this.carrito = data;
        this.carrito.productos.forEach((producto) => {
          this._storageService.getImageUrl(producto._id).subscribe({
            next: (url: string) => {
              producto.imagen = url;
              this.imageLoaded();
            },
            error: (error: any) => {
              console.error(error);
            }
          });
        });
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  ngOnInit(): void {
    this.getCarrito();
  }
}
