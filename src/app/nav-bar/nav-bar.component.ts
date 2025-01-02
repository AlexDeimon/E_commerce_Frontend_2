import { Component, OnInit } from '@angular/core';
import { ICategoria } from '../models/category.model';
import { MyApiService } from '../service/my-api.service';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  categoria: ICategoria = {
    _id: '',
    nombre: '',
    productos: []
  };
  categoriesList: ICategoria[] = [
    {
      _id: '',
      nombre: 'Todos los productos',
      productos: []
    }
  ];

  constructor(private _myApiService: MyApiService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this._myApiService.getAllCategories().subscribe((data: ICategoria[]) => {
      this.categoriesList.push(...data);
    });
  }

  filterProducts(): void {
    if (this.categoria.nombre === 'Todos los productos') {
      this.categoryService.setSelectedCategory('');
      return;
    } else{
      this.categoryService.setSelectedCategory(this.categoria.nombre);
      }
  }

}
