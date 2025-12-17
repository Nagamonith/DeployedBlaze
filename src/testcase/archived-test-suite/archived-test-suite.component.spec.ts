import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedTestSuiteComponent } from './archived-test-suite.component';

describe('ArchivedTestSuiteComponent', () => {
  let component: ArchivedTestSuiteComponent;
  let fixture: ComponentFixture<ArchivedTestSuiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchivedTestSuiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivedTestSuiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
