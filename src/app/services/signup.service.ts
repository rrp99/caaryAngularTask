import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SignupService extends ApiService {
  signup(data: any): any {
    return this.post(`/api/v1/user/register`, data);
  }
}
