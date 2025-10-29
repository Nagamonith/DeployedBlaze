import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttEditorComponent } from './gantt-editor.component';

describe('GanttEditorComponent', () => {
  let component: GanttEditorComponent;
  let fixture: ComponentFixture<GanttEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GanttEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GanttEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
