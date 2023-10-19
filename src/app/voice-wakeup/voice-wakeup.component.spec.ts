import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceWakeupComponent } from './voice-wakeup.component';

describe('VoiceWakeupComponent', () => {
  let component: VoiceWakeupComponent;
  let fixture: ComponentFixture<VoiceWakeupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoiceWakeupComponent]
    });
    fixture = TestBed.createComponent(VoiceWakeupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
