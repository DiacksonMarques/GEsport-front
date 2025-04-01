import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleSellerModalComponent } from './sale-seller-modal.component';

describe('SaleSellerModalComponent', () => {
  let component: SaleSellerModalComponent;
  let fixture: ComponentFixture<SaleSellerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleSellerModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaleSellerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
