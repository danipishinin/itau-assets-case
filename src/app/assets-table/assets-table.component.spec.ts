import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetsTable } from './assets-table.component';
import { AssetsProductService } from '../services/assets-product/assets-product.service';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AssetsTable', () => {
  let component: AssetsTable;
  let fixture: ComponentFixture<AssetsTable>;
  let productServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    // Mock do serviço AssetsProductService
    productServiceMock = {
      listAll: jasmine.createSpy('listAll').and.returnValue(of([
        { code: '123', name: 'Asset 1', category: 'Categoria 1' },
        { code: '456', name: 'Asset 2', category: 'Categoria 2' }
      ])),
      filter: jasmine.createSpy('filter'),
    };

    // Mock do Router
    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [MatTableModule, AssetsTable],
      providers: [
        { provide: AssetsProductService, useValue: productServiceMock },
        { provide: Router, useValue: routerMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the dataSource with products from the service', () => {
    expect(productServiceMock.listAll).toHaveBeenCalled();
    expect(component.dataSource.data.length).toBe(2);
    expect(component.dataSource.data[0].code).toBe('123');
    expect(component.dataSource.data[1].code).toBe('456');
  });

  it('should call productService.filter when applyFilter is called', () => {
    component.applyFilter('123', 'Categoria 1');
    expect(productServiceMock.filter).toHaveBeenCalledWith('123', 'Categoria 1');
  });

  it('should navigate to create with queryParams when onRowClicked is called', () => {
    component.onRowClicked('123');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/create'], { queryParams: { code: '123' } });
  });
});
