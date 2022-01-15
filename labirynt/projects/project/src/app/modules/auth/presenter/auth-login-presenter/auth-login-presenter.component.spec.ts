import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLoginPresenterComponent } from './auth-login-presenter.component';

describe('AuthLoginPresenterComponent', () => {
  let component: AuthLoginPresenterComponent;
  let fixture: ComponentFixture<AuthLoginPresenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthLoginPresenterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLoginPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
