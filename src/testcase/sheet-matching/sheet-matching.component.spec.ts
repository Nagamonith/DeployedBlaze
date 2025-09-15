import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetMatchingComponent } from './sheet-matching.component';

describe('SheetMatchingComponent', () => {
  let component: SheetMatchingComponent;
  let fixture: ComponentFixture<SheetMatchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SheetMatchingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheetMatchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
