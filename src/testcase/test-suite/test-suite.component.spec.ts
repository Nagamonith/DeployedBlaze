import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSuiteComponent } from './test-suite.component';

describe('TestSuiteComponent', () => {
  let component: TestSuiteComponent;
  let fixture: ComponentFixture<TestSuiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestSuiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestSuiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
