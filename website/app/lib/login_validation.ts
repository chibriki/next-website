// app/lib/login_validation.ts
import prisma from './db';

export async function loginValidation(username: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) return [false, 'No such user'];


  const valid = user.password === password;
  if (valid) {
    return [true, {user_role: user.role, id_user: user.id_user, id_team: user.id_team}]; 
  } else {
    return [false, 'Invalid password'];
  }
}
