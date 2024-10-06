import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { GET_ASSETS_CATEGORIES } from '../../mocks/assets-category';

@Injectable({
  providedIn: 'root',
})

export class AssetsCategoryService {

  getAssetsCategory() {
     return of(GET_ASSETS_CATEGORIES);
  }
}
