import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoverNavComponent } from './hover-nav.component';

describe('HoverNavComponent', () => {
  let component: HoverNavComponent;
  let fixture: ComponentFixture<HoverNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoverNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoverNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
