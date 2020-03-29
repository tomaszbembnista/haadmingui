import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalProcessorsComponent } from './signal-processors.component';

describe('SignalProcessorsComponent', () => {
  let component: SignalProcessorsComponent;
  let fixture: ComponentFixture<SignalProcessorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignalProcessorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignalProcessorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
