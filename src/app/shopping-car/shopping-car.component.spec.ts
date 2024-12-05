import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCarComponent } from './shopping-car.component';

describe('ShoppingCarComponent', () => {
  let component: ShoppingCarComponent;
  let fixture: ComponentFixture<ShoppingCarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingCarComponent]
    });
    fixture = TestBed.createComponent(ShoppingCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
