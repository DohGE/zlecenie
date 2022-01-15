import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSavePresenterComponent } from './create-save-presenter.component';

describe('CreateSavePresenterComponent', () => {
  let component: CreateSavePresenterComponent;
  let fixture: ComponentFixture<CreateSavePresenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSavePresenterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSavePresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
