import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLoadingPresenterComponent } from './loading-spinner.component';

describe('CreateLoadingPresenterComponent', () => {
  let component: CreateLoadingPresenterComponent;
  let fixture: ComponentFixture<CreateLoadingPresenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateLoadingPresenterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLoadingPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
