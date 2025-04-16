import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionshipViewComponent } from './championship-view.component';

describe('ChampionshipViewComponent', () => {
  let component: ChampionshipViewComponent;
  let fixture: ComponentFixture<ChampionshipViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChampionshipViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChampionshipViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
