import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AssetsHomepageComponent } from './assets-homepage/assets-homepage.component';
import { Location, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive, AssetsHomepageComponent,MatButtonModule, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'itau-assets';
  constructor(private location: Location) {}

  onGoBack() {
    this.location.back();
  }

  shouldShowGoBackButton(): boolean {
    return this.location.path() !== '';
  }
  renderTitle(): string {
    switch(this.location.path()) {
      case '': return 'Listagem de ativos';
      case '/create': return 'Cadastrar novo ativo';
      default: return 'Editar ativo';
    }
  }

}
