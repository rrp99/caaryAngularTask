import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Regex } from '../../app/constants/constant';
@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {
  signUpFG!: FormGroup;
  isCreatePasswordVisible = false;
  isConfirmPasswordVisible = false;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
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
    const data = this.signUpFG.getRawValue();
    this.httpClient
      .post(
        'https://app-usermgmt-stg-cc-001.azurewebsites.net/api/v1/user/register',
        data
      )
      .subscribe(
        (response) => {
          console.log(response);
        }
        // (error) => {
        //   console.log(error);
        // }
      );
  }
}
