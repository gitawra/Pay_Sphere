import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSphereComponent } from './home-sphere.component';

describe('HomeSphereComponent', () => {
  let component: HomeSphereComponent;
  let fixture: ComponentFixture<HomeSphereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeSphereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSphereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
