import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamingAvatarComponent } from './streaming-avatar.component';

describe('StreamingAvatarComponent', () => {
  let component: StreamingAvatarComponent;
  let fixture: ComponentFixture<StreamingAvatarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StreamingAvatarComponent]
    });
    fixture = TestBed.createComponent(StreamingAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
