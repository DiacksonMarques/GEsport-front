import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectiveRegistrationComponent } from './selective-registration.component';

describe('SelectiveRegistrationComponent', () => {
  let component: SelectiveRegistrationComponent;
  let fixture: ComponentFixture<SelectiveRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectiveRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectiveRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
