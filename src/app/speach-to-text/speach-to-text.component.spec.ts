import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeachToTextComponent } from './speach-to-text.component';

describe('SpeachToTextComponent', () => {
  let component: SpeachToTextComponent;
  let fixture: ComponentFixture<SpeachToTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpeachToTextComponent]
    });
    fixture = TestBed.createComponent(SpeachToTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
