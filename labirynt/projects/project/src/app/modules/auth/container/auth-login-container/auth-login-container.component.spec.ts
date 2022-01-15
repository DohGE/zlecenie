import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLoginContainerComponent } from './auth-login-container.component';

describe('AuthLoginContainerComponent', () => {
  let component: AuthLoginContainerComponent;
  let fixture: ComponentFixture<AuthLoginContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthLoginContainerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLoginContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
