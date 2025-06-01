'use server';

import { loginValidation } from '@/app/lib/login_validation';

export async function userValidation(login: string, password: string) {
  return await loginValidation(login, password);
}
