import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestcasesComponent } from './add-testcases.component';

describe('AddTestcasesComponent', () => {
  let component: AddTestcasesComponent;
  let fixture: ComponentFixture<AddTestcasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTestcasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTestcasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
