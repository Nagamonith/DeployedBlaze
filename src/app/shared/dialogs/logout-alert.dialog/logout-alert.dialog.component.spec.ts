import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutAlertDialogComponent } from './logout-alert.dialog.component';

describe('LogoutAlertDialogComponent', () => {
  let component: LogoutAlertDialogComponent;
  let fixture: ComponentFixture<LogoutAlertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutAlertDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutAlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
