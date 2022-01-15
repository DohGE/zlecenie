import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSignUpPresenterComponent } from './auth-sign-up-presenter.component';

describe('AuthSignUpPresenterComponent', () => {
  let component: AuthSignUpPresenterComponent;
  let fixture: ComponentFixture<AuthSignUpPresenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthSignUpPresenterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthSignUpPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
