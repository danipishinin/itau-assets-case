import { Routes } from '@angular/router';
import { AssetsCreateComponent } from './assets-create/assets-create.component';
import { AssetsHomepageComponent } from './assets-homepage/assets-homepage.component';

export const routes: Routes = [
    {path: '', component: AssetsHomepageComponent},
    {path: 'create', component: AssetsCreateComponent}
];

