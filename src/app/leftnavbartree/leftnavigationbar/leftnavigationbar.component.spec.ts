import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftnavigationbarComponent } from './leftnavigationbar.component';

describe('LeftnavigationbarComponent', () => {
  let component: LeftnavigationbarComponent;
  let fixture: ComponentFixture<LeftnavigationbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftnavigationbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftnavigationbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
