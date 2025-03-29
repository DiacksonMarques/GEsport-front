import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleSellesComponent } from './sale-selles.component';

describe('SaleSellesComponent', () => {
  let component: SaleSellesComponent;
  let fixture: ComponentFixture<SaleSellesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleSellesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaleSellesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
