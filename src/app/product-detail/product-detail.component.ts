import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IProducto } from '../models/product.model';
import { MyApiService } from '../service/my-api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  product?: IProducto;
  productsList: IProducto[] = [];
  carritoId: number;

  constructor(private _route: ActivatedRoute, private _myApiService: MyApiService, private router: Router) {
    this.carritoId = 1;
   }

  goCarrito(): void {
    console.log('Ir al carrito');
    this.router.navigate(['/carrito', this.carritoId]);
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
