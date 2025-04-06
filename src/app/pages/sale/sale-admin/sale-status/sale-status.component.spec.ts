import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleStatusComponent } from './sale-status.component';

describe('SaleStatusComponent', () => {
  let component: SaleStatusComponent;
  let fixture: ComponentFixture<SaleStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
