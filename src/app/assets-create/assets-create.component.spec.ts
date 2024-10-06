import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetsCreateComponent } from './assets-create.component';
import { AssetsCategoryService } from '../services/assets-category/assets-category.service';
import { AssetsProductService } from '../services/assets-product/assets-product.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // Importa NoopAnimationsModule

describe('AssetsCreateComponent', () => {
  let component: AssetsCreateComponent;
  let fixture: ComponentFixture<AssetsCreateComponent>;
  let categoryServiceMock: any;
  let nameServiceMock: any;
  let productServiceMock: any;
  let snackBarMock: any;
  let dialogMock: any;
  let locationMock: any;
  let routeMock: any;

  beforeEach(async () => {
    categoryServiceMock = {
      getAssetsCategory: jasmine.createSpy('getAssetsCategory').and.returnValue(of([{ name: 'Categoria 1', id: 1 }])),
    };

    nameServiceMock = {
      getAssetsName: jasmine.createSpy('getAssetsName').and.returnValue(of(['Nome 1', 'Nome 2'])),
    };

    productServiceMock = {
      getProductByCode: jasmine.createSpy('getProductByCode').and.returnValue(null),
      productExists: jasmine.createSpy('productExists').and.returnValue(false),
      add: jasmine.createSpy('add'),
      editProduct: jasmine.createSpy('editProduct'),
      delete: jasmine.createSpy('delete'),
    };

    snackBarMock = {
      open: jasmine.createSpy('open')
    };

    dialogMock = {
      open: jasmine.createSpy('open')
    };

    locationMock = {
      back: jasmine.createSpy('back')
    };

    routeMock = {
      queryParams: of({ code: null })
    };

    await TestBed.configureTestingModule({
      imports: [MatSnackBarModule, MatDialogModule, NoopAnimationsModule, AssetsCreateComponent], // Importa NoopAnimationsModule
      providers: [
        { provide: AssetsCategoryService, useValue: categoryServiceMock },
        { provide: AssetsProductService, useValue: productServiceMock },
        { provide: MatSnackBar, useValue: snackBarMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: Location, useValue: locationMock },
        { provide: ActivatedRoute, useValue: routeMock }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call onCreate if required fields are filled and isEdited is true', () => {
    component.selectedFilterCategory = 'Categoria 1';
    component.selectedName = 'Nome 1';
    component.selectedFilterCode = '123';
    component.isEdited = true;

    spyOn(component, 'onCreate');
    component.onSave();
    expect(component.onCreate).toHaveBeenCalled();
  });

  it('should call onUpdate if required fields are filled and isEdited is false', () => {
    component.selectedFilterCategory = 'Categoria 1';
    component.selectedName = 'Nome 1';
    component.selectedFilterCode = '123';
    component.isEdited = false;

    spyOn(component, 'onUpdate');
    component.onSave();
    expect(component.onUpdate).toHaveBeenCalled();
  });

  it('should create a new asset if code does not exist', () => {
    component.selectedFilterCategory = 'Categoria 1';
    component.selectedName = 'Nome 1';
    component.selectedFilterCode = '123';

    component.onCreate();
    expect(productServiceMock.add).toHaveBeenCalledWith({
      code: '123',
      name: 'Nome 1',
      category: 'Categoria 1',
    });
    expect(locationMock.back).toHaveBeenCalled();
    expect(snackBarMock.open).toHaveBeenCalledWith('Ativo criado com sucesso', 'Fechar', { duration: 3000 });
  });

  it('should show error if code already exists when creating a new asset', () => {
    productServiceMock.productExists.and.returnValue(true);
    component.selectedFilterCategory = 'Categoria 1';
    component.selectedName = 'Nome 1';
    component.selectedFilterCode = '123';

    component.onCreate();
    expect(snackBarMock.open).toHaveBeenCalledWith('Código já cadastrado', 'Fechar', { duration: 3000 });
    expect(productServiceMock.add).not.toHaveBeenCalled();
  });

  it('should update an existing asset', () => {
    component.selectedFilterCategory = 'Categoria 1';
    component.selectedName = 'Nome 1';
    component.selectedFilterCode = '123';

    component.onUpdate();
    expect(productServiceMock.editProduct).toHaveBeenCalledWith({
      code: '123',
      name: 'Nome 1',
      category: 'Categoria 1',
    });
    expect(locationMock.back).toHaveBeenCalled();
    expect(snackBarMock.open).toHaveBeenCalledWith('Ativo atualizado com sucesso', 'Fechar', { duration: 3000 });
  });

  it('should delete an asset', () => {
    component.selectedFilterCode = '123';
    component.onDelete();

    expect(productServiceMock.delete).toHaveBeenCalledWith('123');
    expect(locationMock.back).toHaveBeenCalled();
    expect(snackBarMock.open).toHaveBeenCalledWith('Ativo deletado com sucesso', 'Fechar', { duration: 3000 });
  });

});
