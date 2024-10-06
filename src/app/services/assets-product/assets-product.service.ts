import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Asset {
  code: string;
  name: string;
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class AssetsProductService {
  private products: Asset[] = [];
  private productsSubject = new BehaviorSubject<Asset[]>([]);

  constructor() {
    this.load();
  }

  private isBrowser(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    );
  }

  load() {
    if (this.isBrowser()) {
      const products = localStorage.getItem('products');
      if (products) {
        this.products = JSON.parse(products);
      }
      this.productsSubject.next(this.products);
    }
  }

  save() {
    if (this.isBrowser()) {
      localStorage.setItem('products', JSON.stringify(this.products));
      this.productsSubject.next(this.products);
    }
  }

  add(product: Asset) {
    this.products.push(product);
    this.save();
  }

  editProduct(updateProduct: Asset) {
    const product = this.getProductByCode(updateProduct.code);
    if (product) {
      product.name = updateProduct.name;
      product.category = updateProduct.category;

      this.productsSubject.next(this.products);
    }
    this.save();
  }

  delete(code: string) {
    this.products = this.products.filter((p) => p.code !== code);
    this.save();
  }

  listAll() {
    return this.productsSubject.asObservable();
  }

  filter(
    code: string | null = null,
    category: string | undefined = undefined
  ): void {
    const filtered = this.products.filter((product) => {
      const codeMatch = code ? product.code.includes(code) : true;
      const categoryMatch =
        category === 'Todos' || category === undefined
          ? true
          : product.category === category;
      return codeMatch && categoryMatch;
    });
    this.productsSubject.next(filtered);
  }

  productExists(code: string): boolean {
    return this.products.some((product) => product.code === code);
  }

  getProductByCode(code: string): Asset | undefined {
    return this.products.find((product) => product.code === code);
  }
}
