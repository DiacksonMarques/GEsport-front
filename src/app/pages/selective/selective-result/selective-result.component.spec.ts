import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectiveResultComponent } from './selective-result.component';

describe('SelectiveResultComponent', () => {
  let component: SelectiveResultComponent;
  let fixture: ComponentFixture<SelectiveResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectiveResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectiveResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
