import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICliente } from '../models/client.model';
import { MyApiService } from '../service/my-api.service';

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
  newClient: boolean = false;

  constructor(private route: ActivatedRoute, private _myApiService: MyApiService) { }

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
