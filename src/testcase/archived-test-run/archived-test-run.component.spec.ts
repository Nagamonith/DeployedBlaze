import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedTestRunComponent } from './archived-test-run.component';

describe('ArchivedTestRunComponent', () => {
  let component: ArchivedTestRunComponent;
  let fixture: ComponentFixture<ArchivedTestRunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchivedTestRunComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivedTestRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
