import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationCandidateComponent } from './evaluation-candidate.component';

describe('EvaluationCandidateComponent', () => {
  let component: EvaluationCandidateComponent;
  let fixture: ComponentFixture<EvaluationCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluationCandidateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvaluationCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
