import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorAlertDialogComponent } from './error-alert-dialog.component';

describe('ErrorAlertDialogComponent', () => {
  let component: ErrorAlertDialogComponent;
  let fixture: ComponentFixture<ErrorAlertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorAlertDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorAlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
