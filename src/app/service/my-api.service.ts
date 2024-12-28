import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IProducto } from '../models/product.model';
import { ICategoria } from '../models/category.model';
import { ICarrito } from '../models/shopping-car.model';

@Injectable({
  providedIn: 'root'
})
export class MyApiService {
  private baseURL = 'https://e-commerce-backend-2-aeav.onrender.com';

  constructor(private _httpClient: HttpClient) { }

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

  addProductToCarrito(carritoId: string, producto: string, cantidad: number): Observable<ICarrito> {
    return this._httpClient.put<ICarrito>(`${this.baseURL}/carritos/agregarProducto/${carritoId}/${producto}/${cantidad}`, {});
  }

}
