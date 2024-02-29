import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminModuleImports } from 'src/assets/moks/ts/importTestModule';

import { MessageHintComponent } from './message-hint.component';

describe('MessageHintComponent', () => {
  let component: MessageHintComponent;
  let fixture: ComponentFixture<MessageHintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageHintComponent ],
      imports: [ AdminModuleImports ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
fixture.destroy();
  });

  it('Emit change', () => {
    component.emitClickLinkChange;
  });
});
