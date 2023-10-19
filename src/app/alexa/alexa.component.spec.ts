import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlexaComponent } from './alexa.component';

describe('AlexaComponent', () => {
  let component: AlexaComponent;
  let fixture: ComponentFixture<AlexaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlexaComponent]
    });
    fixture = TestBed.createComponent(AlexaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
