import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetsHomepageComponent } from './assets-homepage.component';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { AssetsTable as AssetsTableComponent } from '../assets-table/assets-table.component';
import { AssetsFilterComponent } from '../assets-filter/assets-filter.component';
import { AssetsCreateComponent } from '../assets-create/assets-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('AssetsHomepageComponent', () => {
  let component: AssetsHomepageComponent;
  let fixture: ComponentFixture<AssetsHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatButtonModule,
        BrowserAnimationsModule,
        AssetsHomepageComponent,
        AssetsTableComponent,
        AssetsFilterComponent,
        AssetsCreateComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain assets table component', () => {
    const assetsTable = fixture.debugElement.query((de) => de.componentInstance instanceof AssetsTableComponent);
    expect(assetsTable).toBeTruthy();
  });

  it('should contain assets filter component', () => {
    const assetsFilter = fixture.debugElement.query((de) => de.componentInstance instanceof AssetsFilterComponent);
    expect(assetsFilter).toBeTruthy();
  });
});
