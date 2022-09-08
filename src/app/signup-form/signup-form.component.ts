import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Regex } from '../../app/constants/constant';
import { Subscription } from 'rxjs';
import { SignupService } from '../services/signup.service';
import { SignUpData } from '../model/signup.model';
@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {
  signUpFG: FormGroup;
  isCreatePasswordVisible = false;
  isConfirmPasswordVisible = false;
  private subscription = new Subscription();
  signupData: SignUpData;
  constructor(
    private formBuilder: FormBuilder,
    private signupService: SignupService
  ) {}

  ngOnInit(): void {
    this.initFG();
  }

  public send(signUpFG: FormGroup): void {
    if (signUpFG.invalid) {
      for (const control of Object.keys(signUpFG.controls)) {
        signUpFG.controls[control].markAsTouched();
      }
      return;
    }
  }

  initFG(): void {
    this.signUpFG = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(Regex.EMAIL_REGEX)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      checkbox: ['', Validators.required],
      recaptcha: ['', Validators.required],
    });
  }

  get password() {
    return this.signUpFG?.get('password');
  }

  get confirmPassword() {
    return this.signUpFG?.get('confirmPassword');
  }

  containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  }

  containsNumber(str) {
    return /\d/.test(str);
  }

  containsLowercase(str) {
    return /[a-z]/g.test(str);
  }

  containsUpercase(str) {
    return /[A-Z]/g.test(str);
  }

  passwordMatch() {
    return (
      this.password?.value === this.confirmPassword?.value &&
      this.confirmPassword?.value
    );
  }

  signup() {
    if (this.signUpFG.invalid) {
      this.signUpFG.markAllAsTouched();
      return;
    }
    const data = {
      ...this.signupService.mapSignupData(this.signUpFG.getRawValue()),
    };

    this.subscription.add(
      this.signupService.signup(data).subscribe(
        (response) => {
          console.log(response);
          alert('');
          this.signupData = new SignUpData().deserialize(response);
        },
        ({ error }) => {
          console.log(error);
          alert(error.message);
        }
      )
    );
  }
}
