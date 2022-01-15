import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignUp } from 'projects/project/src/app/shared/models/signUp.model';
import { passwordsCompareValidator } from 'projects/project/src/app/shared/validators/passwordValidate';

@Component({
  selector: 'app-auth-sign-up-presenter',
  templateUrl: './auth-sign-up-presenter.component.html',
  styleUrls: ['./auth-sign-up-presenter.component.scss'],
})
export class AuthSignUpPresenterComponent implements OnInit {
  @Output() changeFade = new EventEmitter<void>();
  @Output() register = new EventEmitter<SignUp>();

  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
    ]),
    repeatedPassword: new FormControl(null, [Validators.required]),
  });

  hidePassword = true;
  hideRepeatedPassword = true;

  ngOnInit(): void {
    this.form.setValidators(passwordsCompareValidator());
  }

  change(): void {
    this.changeFade.emit();
  }

  onRegister(): void {
    if (this.form.valid) {
      this.register.emit(this.form.value);
      this.form.reset();
    }
  }
}
