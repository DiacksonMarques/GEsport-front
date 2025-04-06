import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleAdminComponent } from './sale-admin.component';

describe('SaleAdminComponent', () => {
  let component: SaleAdminComponent;
  let fixture: ComponentFixture<SaleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
