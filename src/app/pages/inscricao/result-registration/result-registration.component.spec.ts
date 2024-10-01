import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultRegistrationComponent } from './result-registration.component';

describe('ResultRegistrationComponent', () => {
  let component: ResultRegistrationComponent;
  let fixture: ComponentFixture<ResultRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
