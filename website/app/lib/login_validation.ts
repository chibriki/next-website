// app/lib/login_validation.ts
import prisma from './db';

export async function loginValidation(username: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) return [false, 'No such user'];

  const valid = user.password === password; // hash check if needed
  return valid ? [true, user.role] : [false, 'Invalid password'];
}
