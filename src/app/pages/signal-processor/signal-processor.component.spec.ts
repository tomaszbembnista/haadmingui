import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalProcessorComponent } from './signal-processor.component';

describe('SignalProcessorComponent', () => {
  let component: SignalProcessorComponent;
  let fixture: ComponentFixture<SignalProcessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignalProcessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignalProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
