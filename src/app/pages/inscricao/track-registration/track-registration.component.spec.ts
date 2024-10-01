import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackRegistrationComponent } from './track-registration.component';

describe('TrackRegistrationComponent', () => {
  let component: TrackRegistrationComponent;
  let fixture: ComponentFixture<TrackRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrackRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
