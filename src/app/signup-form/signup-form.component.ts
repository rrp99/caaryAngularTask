import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Regex } from '../../app/constants/constant';
import { Subscription } from 'rxjs';
import { SignupService } from '../services/signup.service';
@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {
  signUpFG!: FormGroup;
  isCreatePasswordVisible = false;
  isConfirmPasswordVisible = false;
  private subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
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

  containsSpecialChars(str: any) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  }

  containsNumber(str: any) {
    return /\d/.test(str);
  }

  containsLowercase(str: any) {
    return /[a-z]/g.test(str);
  }

  containsUpercase(str: any) {
    return /[A-Z]/g.test(str);
  }

  passwordMatch() {
    return (
      this.password?.value === this.confirmPassword?.value &&
      this.confirmPassword?.value
    );
  }

  signup() {
    if (!this.signUpFG.valid) {
      this.signUpFG.markAllAsTouched();
      return;
    }
    const data = {
      email: this.signUpFG.getRawValue().email,
      firstName: this.signUpFG.getRawValue().firstName,
      lastName: this.signUpFG.getRawValue().lastName,
      password: this.signUpFG.getRawValue().password,
    };

    this.subscription.add(
      this.signupService.signup(data).subscribe(
        (response: any) => {
          console.log(response);
          alert('Signup successfull');
        },
        (error: any) => {
          console.log(error);
          alert('Unable to signup');
        }
      )
    );
  }
}
