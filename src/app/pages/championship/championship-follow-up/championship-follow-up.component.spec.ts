import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionshipFollowUpComponent } from './championship-follow-up.component';

describe('ChampionshipFollowUpComponent', () => {
  let component: ChampionshipFollowUpComponent;
  let fixture: ComponentFixture<ChampionshipFollowUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChampionshipFollowUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChampionshipFollowUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
