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
  loading = false;
  imagesLoaded = 0;

  constructor(private _myApiService: MyApiService, private categoryService: CategoryService, private storageService: StorageService) {}

  mostrarAlerta(icon:any, title:string): void {
    Swal.fire({ icon, title });
  }

  goShoppingCar(): void {
    this._myApiService.goShoppingCar();
  }

  imageLoaded(): void {
    this.imagesLoaded++;
    if (this.imagesLoaded === this.productsList.length) {
      this.loading = false;
    }
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
      this.loading = true;
      if (category) {
        this._myApiService.getProductsByCategory(category).subscribe((data: IProducto[]) => {
          this.productsList = data;
          this.imagesLoaded = 0;
          this.productsList.forEach(product => {
            this.storageService.getImageUrl(product._id).subscribe(url => {
              product.imagen = url;
              this.imageLoaded();
            });
            if (product.stock <= 0) {
              product.agotado = true;
            } else {
              product.agotado = false;
            }
          });
        });
      } else if (category == '') {
        this._myApiService.getAllProducts().subscribe((data: IProducto[]) => {
          this.productsList = data;
          this.imagesLoaded = 0;
          this.productsList.forEach(product => {
            this.storageService.getImageUrl(product._id).subscribe(url => {
              product.imagen = url;
              this.imageLoaded();
            });
            if (product.stock <= 0) {
              product.agotado = true;
            } else {
              product.agotado = false;
            }
          });
        });
      }
    });
  }
}
