import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCheckMailboxComponent } from './dialog-check-mailbox.component';

describe('DialogCheckMailboxComponent', () => {
  let component: DialogCheckMailboxComponent;
  let fixture: ComponentFixture<DialogCheckMailboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogCheckMailboxComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCheckMailboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
