import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeAvatarComponent } from './three-avatar.component';

describe('ThreeAvatarComponent', () => {
  let component: ThreeAvatarComponent;
  let fixture: ComponentFixture<ThreeAvatarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThreeAvatarComponent]
    });
    fixture = TestBed.createComponent(ThreeAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
