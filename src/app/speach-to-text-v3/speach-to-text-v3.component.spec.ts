import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeachToTextV3Component } from './speach-to-text-v3.component';

describe('SpeachToTextV3Component', () => {
  let component: SpeachToTextV3Component;
  let fixture: ComponentFixture<SpeachToTextV3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpeachToTextV3Component]
    });
    fixture = TestBed.createComponent(SpeachToTextV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
