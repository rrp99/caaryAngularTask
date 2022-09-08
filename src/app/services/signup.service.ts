import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignUpData } from '../model/signup.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SignupService extends ApiService {
  signup(data): Observable<any> {
    return this.post(`/api/v1/user/register`, data);
  }

  mapSignupData(formValue) {
    const signupdata = new SignUpData();
    signupdata.firstName = formValue?.firstName;
    signupdata.lastName = formValue?.lastName;
    signupdata.email = formValue?.email;
    signupdata.password = formValue?.password;
    return signupdata;
  }
}
