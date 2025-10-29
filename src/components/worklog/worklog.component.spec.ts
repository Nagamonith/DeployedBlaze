import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorklogComponent } from './worklog.component';

describe('WorklogComponent', () => {
  let component: WorklogComponent;
  let fixture: ComponentFixture<WorklogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorklogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorklogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
