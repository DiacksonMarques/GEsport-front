import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeferCandidateComponent } from './defer-candidate.component';

describe('DeferCandidateComponent', () => {
  let component: DeferCandidateComponent;
  let fixture: ComponentFixture<DeferCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeferCandidateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeferCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
