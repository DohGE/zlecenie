import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditPresenterComponent } from './create-edit-presenter.component';

describe('CreateEditPresenterComponent', () => {
  let component: CreateEditPresenterComponent;
  let fixture: ComponentFixture<CreateEditPresenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEditPresenterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
