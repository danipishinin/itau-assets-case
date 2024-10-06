import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Asset, AssetsProductService } from '../services/assets-product/assets-product.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'assets-table',
  styleUrl: 'assets-table.component.css',
  templateUrl: 'assets-table.component.html',
  standalone: true,
  imports: [MatTableModule, NgIf],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AssetsTable implements AfterViewInit {
  displayedColumns = ['code', 'name', 'category'];
  dataSource = new MatTableDataSource<Asset>();
  constructor(private productService: AssetsProductService,private router: Router) {
    this.productService.listAll().subscribe((products) => {
      this.dataSource.data = products;
    });
  }

  ngAfterViewInit() {
    this.productService.listAll().subscribe((products) => {
      this.dataSource.data = products;
    });
  }

  applyFilter(code: string | null, category: string | undefined) {
    this.productService.filter(code, category);
  }

  onRowClicked(code: string): void {
    this.router.navigate(['/create'], { queryParams: { code: code } });
  }
}
