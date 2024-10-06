import { TestBed } from '@angular/core/testing';
import { AssetsCategoryService } from './assets-category.service';
import { of } from 'rxjs';
import { GET_ASSETS_CATEGORIES } from '../../mocks/assets-category';

describe('AssetsCategoryService', () => {
  let service: AssetsCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetsCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return categories from getAssetsCategory', (done) => {
    service.getAssetsCategory().subscribe((categories) => {
      expect(categories).toEqual(GET_ASSETS_CATEGORIES);
      done();
    });
  });
});
