import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PAGE3Component } from './page3.component';

describe('PAGE3Component', () => {
  let component: PAGE3Component;
  let fixture: ComponentFixture<PAGE3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PAGE3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PAGE3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
