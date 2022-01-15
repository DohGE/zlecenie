import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuContainerComponent } from './user-menu-container.component';

describe('UserMenuContainerComponent', () => {
  let component: UserMenuContainerComponent;
  let fixture: ComponentFixture<UserMenuContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserMenuContainerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMenuContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
