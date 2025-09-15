import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundAlertDialogComponent } from './not-found-alert-dialog.component';

describe('NotFoundAlertDialogComponent', () => {
  let component: NotFoundAlertDialogComponent;
  let fixture: ComponentFixture<NotFoundAlertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundAlertDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotFoundAlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
