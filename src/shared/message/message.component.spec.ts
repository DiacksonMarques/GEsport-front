import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { MessageComponent } from './message.component';
import { AdminModuleImports } from 'src/assets/moks/ts/importTestModule';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageComponent ],
      imports: [ AdminModuleImports ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {timing: 500} },
        { provide: MatDialogRef, useValue: {
          close: ()=>{}
        } },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
fixture.destroy();
  });

  it('Close dialog', fakeAsync(() => {
    component.close();
    fixture.detectChanges();

    tick(500);
    discardPeriodicTasks();

    component.closeTiming();

    flush();
  }));
});
