import { environment } from 'src/environments/environment';

export default [
  {
    provide: 'BASE_URL',
    useValue: environment.base_url,
  },
];
