import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IProducto } from '../models/product.model';
import { MyApiService } from '../service/my-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  carritoId: number;
  product: IProducto = {} as IProducto;
  productsList: IProducto[] = [];

  constructor(private router: Router, private _myApiService: MyApiService) {
    this.carritoId = 1;
  }

  goCarrito(): void {
    console.log('Ir al carrito');
    this.router.navigate(['/carrito', this.carritoId]);
  }

  ngOnInit(): void {
    this._myApiService.getAllProducts().subscribe((data: IProducto[]) => {
      console.log(data);
      this.productsList = data;
    });
  }
}
