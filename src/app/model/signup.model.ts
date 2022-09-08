import { get, set } from 'lodash';

export interface Deserializable {
  deserialize(input: any): this;
}

export class SignUpData implements Deserializable {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;

  deserialize(input: any) {
    Object.assign(
      this,
      set({}, 'firstName', get(input, ['data', 'firstName'])),
      set({}, 'lastName', get(input, ['data', 'lastName'])),
      set({}, 'email', get(input, ['data', 'email']))
    );
    return this;
  }
}
