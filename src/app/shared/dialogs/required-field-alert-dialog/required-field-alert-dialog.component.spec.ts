import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredFieldAlertDialogComponent } from './required-field-alert-dialog.component';

describe('RequiredFieldAlertDialogComponent', () => {
  let component: RequiredFieldAlertDialogComponent;
  let fixture: ComponentFixture<RequiredFieldAlertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequiredFieldAlertDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequiredFieldAlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
