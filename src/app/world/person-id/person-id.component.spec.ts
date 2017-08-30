import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonIdComponent } from './person-id.component';

describe('PersonIdComponent', () => {
  let component: PersonIdComponent;
  let fixture: ComponentFixture<PersonIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
