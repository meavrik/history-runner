import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TribeControllerComponent } from './tribe-controller.component';

describe('TribeControllerComponent', () => {
  let component: TribeControllerComponent;
  let fixture: ComponentFixture<TribeControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TribeControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TribeControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
