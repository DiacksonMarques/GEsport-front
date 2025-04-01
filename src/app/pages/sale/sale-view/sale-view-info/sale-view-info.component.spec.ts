import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleViewInfoComponent } from './sale-view-info.component';

describe('SaleViewInfoComponent', () => {
  let component: SaleViewInfoComponent;
  let fixture: ComponentFixture<SaleViewInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleViewInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaleViewInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
