import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleteRegistrationUpdateComponent } from './athlete-registration-update.component';

describe('AthleteRegistrationUpdateComponent', () => {
  let component: AthleteRegistrationUpdateComponent;
  let fixture: ComponentFixture<AthleteRegistrationUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AthleteRegistrationUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AthleteRegistrationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
