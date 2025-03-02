import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
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
  inputSearch: boolean = false;

  constructor(private _myApiService: MyApiService, private categoryService: CategoryService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentPath = event.urlAfterRedirects;
        this.inputSearch = currentPath === '/';
      }
    });
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
