import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TribeViewComponent } from './tribe-view.component';

describe('TribeViewComponent', () => {
  let component: TribeViewComponent;
  let fixture: ComponentFixture<TribeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TribeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TribeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
