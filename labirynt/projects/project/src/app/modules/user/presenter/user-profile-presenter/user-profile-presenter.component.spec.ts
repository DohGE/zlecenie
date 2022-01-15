import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuPresenterComponent } from './user-menu-presenter.component';

describe('UserMenuPresenterComponent', () => {
  let component: UserMenuPresenterComponent;
  let fixture: ComponentFixture<UserMenuPresenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserMenuPresenterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMenuPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
