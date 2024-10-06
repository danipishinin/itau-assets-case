import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AssetsCreateComponent } from '../assets-create/assets-create.component';
import { AssetsFilterComponent } from '../assets-filter/assets-filter.component';
import { AssetsTable as AssetsTableComponent } from '../assets-table/assets-table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-assets-homepage',
  standalone: true,
  imports: [
    RouterOutlet,
    AssetsTableComponent,
    AssetsFilterComponent,
    AssetsCreateComponent,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './assets-homepage.component.html',
  styleUrl: './assets-homepage.component.css',
})
export class AssetsHomepageComponent {}
