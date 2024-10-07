import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEvaluationComponent } from './dialog-evaluation.component';

describe('DialogEvaluationComponent', () => {
  let component: DialogEvaluationComponent;
  let fixture: ComponentFixture<DialogEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEvaluationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
