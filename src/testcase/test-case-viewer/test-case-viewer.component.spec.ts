import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCaseViewerComponent } from './test-case-viewer.component';

describe('TestCaseViewerComponent', () => {
  let component: TestCaseViewerComponent;
  let fixture: ComponentFixture<TestCaseViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCaseViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestCaseViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
