import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraAddsComponent } from './extra-adds.component';

describe('ExtraAddsComponent', () => {
  let component: ExtraAddsComponent;
  let fixture: ComponentFixture<ExtraAddsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtraAddsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtraAddsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
