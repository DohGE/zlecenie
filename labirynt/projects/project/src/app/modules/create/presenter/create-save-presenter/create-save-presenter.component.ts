import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-save-presenter',
  templateUrl: './create-save-presenter.component.html',
  styleUrls: ['./create-save-presenter.component.scss'],
})
export class CreateSavePresenterComponent {
  @Output() save = new EventEmitter<string>();
  @Output() back = new EventEmitter<void>();

  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(5)]),
  });
  error = false;

  onSave(): void {
    if (this.form.valid) {
      this.save.emit(this.form.controls.name.value);
      this.form.reset();
    } else if (this.form.controls.name.errors.length) {
      this.error = true;
    } else {
      this.error = true;
    }
    setTimeout(() => {
      this.error = false;
    }, 3000);
  }

  onBack(): void {
    this.back.emit();
  }
}
