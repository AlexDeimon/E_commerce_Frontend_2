import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shopping-car',
  templateUrl: './shopping-car.component.html',
  styleUrls: ['./shopping-car.component.css']
})
export class ShoppingCarComponent implements OnInit {
  carritoId: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.carritoId = this.route.snapshot.paramMap.get('carritoId');
  }
}
