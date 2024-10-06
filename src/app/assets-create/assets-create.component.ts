import { NgFor, NgIf } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoryType } from '../types/category';
import { AssetsCategoryService } from '../services/assets-category/assets-category.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AssetsProductService } from '../services/assets-product/assets-product.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-assets-create',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgFor,
    NgIf,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  providers: [AssetsCategoryService],
  templateUrl: './assets-create.component.html',
  styleUrl: './assets-create.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AssetsCreateComponent {
  categories: CategoryType[] = [];
  selectedFilterCategory: string | undefined;
  names: string[] = [];
  selectedName: string | undefined;
  selectedFilterCode: string | undefined;
  isEdited = true;
  private _snackBar = inject(MatSnackBar);
  readonly dialog = inject(MatDialog);
  constructor(
    private categoryService: AssetsCategoryService,
    private location: Location,
    private assetsProductService: AssetsProductService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.categoryService.getAssetsCategory().subscribe((categories) => {
      this.categories = categories;
    });
    this.route.queryParams.subscribe((params) => {
      if (params?.['code']) {
        this.isEdited = false;
        this.selectedFilterCode = params['code'];
        const product = this.assetsProductService.getProductByCode(
          params?.['code']
        );
        if (product) {
          this.selectedName = product.name;
          this.selectedFilterCategory = product.category;
        }
      }
    });
  }

  validateRequiredFields() {
    if (
      this.selectedFilterCategory &&
      this.selectedName &&
      this.selectedFilterCode
    ) {
      if (!this.isEdited) {
        this.onUpdate();
      } else {
        this.onCreate();
      }
    } else {
      this._snackBar.open('Preencha todos os campos obrigatórios', 'Fechar', {
        duration: 3000,
        panelClass: 'custom-class',
        
      });
    }
  }
  onCreate() {
    if (this.assetsProductService.productExists(this.selectedFilterCode!)) {
      this._snackBar.open('Código já cadastrado', 'Fechar', {
        duration: 3000,
      });
      return;
    } else {
      this.assetsProductService.add({
        code: this.selectedFilterCode!,
        name: this.selectedName!,
        category: this.selectedFilterCategory!,
      });
      this.onGoBack();
      this._snackBar.open('Ativo criado com sucesso', 'Fechar', {
        duration: 3000,
      });
    }
  }

  onUpdate() {
    this.assetsProductService.editProduct({
      code: this.selectedFilterCode!,
      name: this.selectedName!,
      category: this.selectedFilterCategory!,
    });
    this.onGoBack();
    this._snackBar.open('Ativo atualizado com sucesso', 'Fechar', {
      duration: 3000,
    });
  }

  onSave() {
    this.validateRequiredFields();
  }

  onGoBack() {
    this.location.back();
  }

  onDelete() {
    this.assetsProductService.delete(this.selectedFilterCode!);
    this.onGoBack();
    this._snackBar.open('Ativo deletado com sucesso', 'Fechar', {
      duration: 3000,
    });
  }
  deleteConfirm(): void {
    this.dialog.open(DialogComponent, {
      data: {
        title: `Deletar Ativo ${this.selectedFilterCode}`,
        message: 'Tem certeza que deseja deletar esse ativo?',
        confirm: () => this.onDelete(),
      },
    });
  }
}
