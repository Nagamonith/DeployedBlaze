import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConfirmationDialogComponent } from './add-confirmation-dialog.component';

describe('AddConfirmationDialogComponent', () => {
  let component: AddConfirmationDialogComponent;
  let fixture: ComponentFixture<AddConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddConfirmationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
