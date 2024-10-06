import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NgFor, NgIf } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CategoryType } from '../types/category';
import { AssetsProductService } from '../services/assets-product/assets-product.service';
import { AssetsCategoryService } from '../services/assets-category/assets-category.service';

@Component({
  selector: 'app-assets-filter',
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './assets-filter.component.html',
  styleUrl: './assets-filter.component.css',
})
export class AssetsFilterComponent {
  categories: CategoryType[] = [];
  selectedFilterCategory: string | undefined;
  selectedFilterCode : string | undefined;
  constructor(
    private categoryService: AssetsCategoryService,
    private productService: AssetsProductService,
  ) {
    
  }

  ngOnInit() {
    this.categoryService.getAssetsCategory().subscribe((categories) => {
      this.categories = [{ name: 'Todos', id: 0 }, ...categories];
    });
  
  }

  onCategoryChange(category: string) {
    if (category === 'Todos') {
      this.selectedFilterCategory = undefined;
    }
  }

  clearFilters() {
    this.selectedFilterCode = undefined;
    this.selectedFilterCategory = undefined;
    this.productService.load();
  }

  onFilterButtonClick() {
    this.productService.filter(
      this.selectedFilterCode,
      this.selectedFilterCategory
    );
  }


}
