import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugMetricsEditorComponent } from './bug-metrics-editor.component';

describe('BugMetricsEditorComponent', () => {
  let component: BugMetricsEditorComponent;
  let fixture: ComponentFixture<BugMetricsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BugMetricsEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BugMetricsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
