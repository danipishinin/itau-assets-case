import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetsFilterComponent } from './assets-filter.component';
import { AssetsCategoryService } from '../services/assets-category/assets-category.service';
import { AssetsProductService } from '../services/assets-product/assets-product.service';
import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AssetsFilterComponent', () => {
  let component: AssetsFilterComponent;
  let fixture: ComponentFixture<AssetsFilterComponent>;
  let categoryServiceMock: any;
  let productServiceMock: any;

  beforeEach(async () => {
    categoryServiceMock = {
      getAssetsCategory: jasmine.createSpy('getAssetsCategory').and.returnValue(of([
        { name: 'Categoria 1', id: 1 },
        { name: 'Categoria 2', id: 2 }
      ])),
    };

    productServiceMock = {
      filter: jasmine.createSpy('filter'),
      load: jasmine.createSpy('load'),
    };

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
        AssetsFilterComponent,
      ],
      providers: [
        { provide: AssetsCategoryService, useValue: categoryServiceMock },
        { provide: AssetsProductService, useValue: productServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  it('should set selectedFilterCategory to undefined when "Todos" is selected', () => {
    component.onCategoryChange('Todos');
    expect(component.selectedFilterCategory).toBeUndefined();
  });


  it('should call productService.filter when onFilterButtonClick is triggered', () => {
    component.selectedFilterCode = '123';
    component.selectedFilterCategory = 'Categoria 1';
    component.onFilterButtonClick();
    expect(productServiceMock.filter).toHaveBeenCalledWith('123', 'Categoria 1');
  });

  it('should call productService.load and clear filters when clearFilters is triggered', () => {
    component.clearFilters();
    expect(component.selectedFilterCode).toBeUndefined();
    expect(component.selectedFilterCategory).toBeUndefined();
    expect(productServiceMock.load).toHaveBeenCalled();
  });
});
