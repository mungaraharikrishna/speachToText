import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechToTextMainComponent } from './speech-to-text-main.component';

describe('SpeechToTextMainComponent', () => {
  let component: SpeechToTextMainComponent;
  let fixture: ComponentFixture<SpeechToTextMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpeechToTextMainComponent]
    });
    fixture = TestBed.createComponent(SpeechToTextMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
