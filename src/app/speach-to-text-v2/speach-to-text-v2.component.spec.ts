import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeachToTextV2Component } from './speach-to-text-v2.component';

describe('SpeachToTextV2Component', () => {
  let component: SpeachToTextV2Component;
  let fixture: ComponentFixture<SpeachToTextV2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpeachToTextV2Component]
    });
    fixture = TestBed.createComponent(SpeachToTextV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
