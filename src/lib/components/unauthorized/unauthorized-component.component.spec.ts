import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorizedComponentComponent } from './unauthorized-component.component';

describe('UnauthorizedComponentComponent', () => {
  let component: UnauthorizedComponentComponent;
  let fixture: ComponentFixture<UnauthorizedComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnauthorizedComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnauthorizedComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
