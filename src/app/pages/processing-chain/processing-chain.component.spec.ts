import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingChainComponent } from './processing-chain.component';

describe('ProcessingChainComponent', () => {
  let component: ProcessingChainComponent;
  let fixture: ComponentFixture<ProcessingChainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessingChainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessingChainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
