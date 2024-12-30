import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IProducto } from '../models/product.model';
import { ICategoria } from '../models/category.model';
import { ICarrito } from '../models/shopping-car.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MyApiService {
  private baseURL = 'https://e-commerce-backend-2-aeav.onrender.com';

  carrito: ICarrito = {
    _id: '',
    idCliente: '',
    cantidad_productos: 0,
    productos: [],
    precioTotal: 0
  };

  constructor(private _httpClient: HttpClient, private router: Router) { }

  mostrarAlerta(icon: any, title: string): void {
    Swal.fire({ icon, title });
  }

  //* Categorias
  getAllCategories(): Observable<ICategoria[]> {
    return this._httpClient.get<ICategoria[]>(`${this.baseURL}/categorias`);
  }

  //* Productos
  getAllProducts(): Observable<IProducto[]> {
    return this._httpClient.get<IProducto[]>(`${this.baseURL}/productos`);
  }

  getProduct(producto: string): Observable<IProducto> {
    return this._httpClient.get<IProducto>(`${this.baseURL}/productos/${producto}`);
  }

  getProductsByCategory(categoria: string): Observable<IProducto[]> {
    return this._httpClient.get<IProducto[]>(`${this.baseURL}/categorias/productos/${categoria}`);
  }

  //* Carrito
  newShoppingCar(): Observable<ICarrito> {
    return this._httpClient.post<ICarrito>(`${this.baseURL}/carritos/crear`, {});
  }

  getCarrito(carritoId: string): Observable<ICarrito> {
    return this._httpClient.get<ICarrito>(`${this.baseURL}/carritos/${carritoId}`);
  }

  goCarrito(): void {
    const carritoActual = sessionStorage.getItem("carritoActual");
    if (carritoActual) {	
      this.getCarrito(carritoActual).subscribe({
        next: (response) => {
          this.carrito = response;
          if (this.carrito.productos.length === 0) {
            this.mostrarAlerta('error', 'No has agregado ningún producto al carrito');
          } else {
            this.router.navigate(['/carrito', this.carrito._id]);
          }
        },
        error: (error) => {
          console.error('Error al obtener el carrito:', error);
        }
      });
    }
  }

  addProductToCarrito(carritoId: string, producto: string, cantidad: number): Observable<ICarrito> {
    return this._httpClient.put<ICarrito>(`${this.baseURL}/carritos/agregarProducto/${carritoId}/${producto}/${cantidad}`, {});
  }

  removeProductFromCarrito(carritoId: string, producto: string): Observable<ICarrito> {
    return this._httpClient.put<ICarrito>(`${this.baseURL}/carritos/borrarProducto/${carritoId}/${producto}`, {});
  }

}
