import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { IProducto } from '../models/product.model';
import { ICarrito } from '../models/shopping-car.model';
import { MyApiService } from '../service/my-api.service';
import { CategoryService } from '../service/category.service';
import { StorageService } from '../service/storage.service';

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

  constructor(private _myApiService: MyApiService, private categoryService: CategoryService, private storageService: StorageService) {}

  mostrarAlerta(icon:any, title:string): void {
    Swal.fire({ icon, title });
  }

  goShoppingCar(): void {
    this._myApiService.goShoppingCar();
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
    this.categoryService.selectedCategory$.subscribe((category) => {
      if (category) {
        this._myApiService.getProductsByCategory(category).subscribe((data: IProducto[]) => {
          this.productsList = data;
          this.productsList.forEach(product => {
            this.storageService.getImageUrl(product._id).subscribe(url => {
              product.imagen = url;
            });
          });
        });
      } else if (category == '') {
        this._myApiService.getAllProducts().subscribe((data: IProducto[]) => {
          this.productsList = data;
          this.productsList.forEach(product => {
            this.storageService.getImageUrl(product._id).subscribe(url => {
              product.imagen = url;
            });
          });
        });
      }
    });
  }
}
