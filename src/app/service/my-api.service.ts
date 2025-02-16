import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IProducto } from '../models/product.model';
import { ICategoria } from '../models/category.model';
import { ICarrito } from '../models/shopping-car.model';
import { ICliente } from '../models/client.model';
import { ICompra } from '../models/purchase.model';
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

  getShoppingCar(carritoId: string): Observable<ICarrito> {
    return this._httpClient.get<ICarrito>(`${this.baseURL}/carritos/${carritoId}`);
  }

  goShoppingCar(): void {
    const carritoActual = sessionStorage.getItem("carritoActual");
    if (carritoActual) {	
      this.getShoppingCar(carritoActual).subscribe({
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

  addProductToShoppingCar(carritoId: string, producto: string, cantidad: number): Observable<ICarrito> {
    return this._httpClient.put<ICarrito>(`${this.baseURL}/carritos/agregarProducto/${carritoId}/${producto}/${cantidad}`, {});
  }

  removeProductFromShoppingCar(carritoId: string, producto: string): Observable<ICarrito> {
    return this._httpClient.put<ICarrito>(`${this.baseURL}/carritos/borrarProducto/${carritoId}/${producto}`, {});
  }

  //* Clientes

  getClient(cliente: string): Observable<any> {
    return this._httpClient.get<any>(`${this.baseURL}/clientes/${cliente}`);
  }

  getClientComponent(cliente: string): void {
    if (cliente) {
      this.router.navigate(['/cliente', cliente]);
    } else {
      this.mostrarAlerta('error', 'Debes digitar un numero de ID cliente');
    }
  }

  updateClient(id: string, cliente:ICliente): Observable<any> {
    return this._httpClient.put<any>(`${this.baseURL}/clientes/actualizar/${id}`, cliente);
  }

  //* compras

  newPurchase(clienteId:string, carritoId: string): Observable<ICompra> {
    return this._httpClient.post<ICompra>(`${this.baseURL}/compras/agregar/${clienteId}/${carritoId}`, {});
  }

}
