import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionshipCreateComponent } from './championship-create.component';

describe('ChampionshipCreateComponent', () => {
  let component: ChampionshipCreateComponent;
  let fixture: ComponentFixture<ChampionshipCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChampionshipCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChampionshipCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
