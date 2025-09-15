import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTestcasesComponent } from './edit-testcases.component';

describe('EditTestcasesComponent', () => {
  let component: EditTestcasesComponent;
  let fixture: ComponentFixture<EditTestcasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTestcasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTestcasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
