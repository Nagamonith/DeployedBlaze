import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftnavbartreeComponent } from './leftnavbartree.component';

describe('LeftnavbartreeComponent', () => {
  let component: LeftnavbartreeComponent;
  let fixture: ComponentFixture<LeftnavbartreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftnavbartreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftnavbartreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
