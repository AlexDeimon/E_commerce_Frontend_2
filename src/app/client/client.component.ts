import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICliente } from '../models/client.model';
import { ICarrito } from '../models/shopping-car.model';
import { MyApiService } from '../service/my-api.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit{
  client: ICliente = {
    _id:      '',
    nombre:   '',
    apellidos:'',
    direccion:'',
    telefono: '',
    correo:   '',
    compras:  []
  };
  shoppingCar: ICarrito = {
    _id:                '',
    idCliente:          '',
    cantidad_productos: 0,
    productos:          [],
    precioTotal:        0
  };
  newClient: boolean = false;
  modifyClient: boolean = false;

  constructor(private route: ActivatedRoute, private _myApiService: MyApiService, private _storageService:StorageService) { }

  getShoppingCar(id:string): void {
    this._myApiService.getShoppingCar(id).subscribe({
      next: (data: ICarrito) => {
        this.shoppingCar = data;
        this.shoppingCar.productos.forEach((producto) => {
          this._storageService.getImageUrl(producto._id).subscribe({
            next: (url: string) => {
              producto.imagen = url;
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

  modifyClientData(): void {
    this.modifyClient = true;
    const elements = document.getElementsByClassName('input-group-text-4');
    for (let i = 0; i < elements.length; i++) {
      (elements[i] as HTMLElement).style.backgroundColor = '#ffc107';
    }
  }

  updateClient(): void {
    this._myApiService.updateClient(this.client._id, this.client).subscribe({
      next: () => {
        this.modifyClient = false;
        const elements = document.getElementsByClassName('input-group-text-4');
        for (let i = 0; i < elements.length; i++) {
          (elements[i] as HTMLElement).style.backgroundColor = '';
        }
        this._myApiService.mostrarAlerta('success', 'Datos actualizados correctamente');
      },
      error: (error: any) => {
        this._myApiService.mostrarAlerta('error', error.error.message);
        console.error(error);
      }
    });
  }

  ngOnInit(): void {
      this.client._id = this.route.snapshot.paramMap.get('clienteId') || '';
      this._myApiService.getClient(this.client._id).subscribe({
        next: (data: ICliente) => {
          this.client = data;
          console.log('Cliente:', this.client);
          this.newClient = false;
        },
        error: () => {
          this.newClient = true;
        }
      });
  }
}
