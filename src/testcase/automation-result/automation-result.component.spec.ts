import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationResultComponent } from './automation-result.component';

describe('AutomationResultComponent', () => {
  let component: AutomationResultComponent;
  let fixture: ComponentFixture<AutomationResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutomationResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomationResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
