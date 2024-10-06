import { TestBed } from '@angular/core/testing';
import { AssetsProductService, Asset } from './assets-product.service';

describe('AssetsProductService', () => {
  let service: AssetsProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetsProductService);

    spyOn(service as any, 'isBrowser').and.returnValue(true);
    localStorage.clear();
    service['products'] = [];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load products from localStorage', (done) => {
    const mockProducts: Asset[] = [
      { code: '001', name: 'Asset 1', category: 'Category 1' },
      { code: '002', name: 'Asset 2', category: 'Category 2' },
    ];
    localStorage.setItem('products', JSON.stringify(mockProducts));

    service.load();

    service.listAll().subscribe((products) => {
      expect(products).toEqual(mockProducts);
      done();
    });
  });

  it('should add a product and save to localStorage', (done) => {
    const newProduct: Asset = { code: '003', name: 'Asset 3', category: 'Category 3' };
    service.add(newProduct);

    service.listAll().subscribe((products) => {
      expect(products.length).toBe(1);
      expect(products[0]).toEqual(newProduct);
      done();
    });

    const savedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    expect(savedProducts.length).toBe(1);
    expect(savedProducts[0]).toEqual(newProduct);
  });

  it('should edit an existing product', (done) => {
    const product: Asset = { code: '003', name: 'Asset 3', category: 'Category 3' };
    service.add(product);

    const updatedProduct: Asset = { code: '003', name: 'Updated Asset 3', category: 'Updated Category 3' };
    service.editProduct(updatedProduct);

    service.listAll().subscribe((products) => {
      expect(products.length).toBe(1);
      expect(products[0].name).toBe('Updated Asset 3');
      expect(products[0].category).toBe('Updated Category 3');
      done();
    });
  });

  it('should delete a product', (done) => {
    const product: Asset = { code: '003', name: 'Asset 3', category: 'Category 3' };
    service.add(product);

    service.delete('003');

    service.listAll().subscribe((products) => {
      expect(products.length).toBe(0);
      done();
    });

    const savedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    expect(savedProducts.length).toBe(0);
  });


  it('should check if a product exists by code', () => {
    const product: Asset = { code: '004', name: 'Asset 4', category: 'Category 4' };
    service.add(product);

    expect(service.productExists('004')).toBe(true);
    expect(service.productExists('999')).toBe(false);
  });

  it('should return product by code', () => {
    const product: Asset = { code: '005', name: 'Asset 5', category: 'Category 5' };
    service.add(product);

    const retrievedProduct = service.getProductByCode('005');
    expect(retrievedProduct).toEqual(product);
  });
});
