import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzureAnimatedAvatarComponent } from './azure-animated-avatar.component';

describe('AzureAnimatedAvatarComponent', () => {
  let component: AzureAnimatedAvatarComponent;
  let fixture: ComponentFixture<AzureAnimatedAvatarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AzureAnimatedAvatarComponent]
    });
    fixture = TestBed.createComponent(AzureAnimatedAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
