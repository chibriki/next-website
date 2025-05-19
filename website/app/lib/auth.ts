import prisma from './db'
import type { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies'

export async function getUserFromCookies(cookies: RequestCookies) {
  const id_user = cookies.get('id_user')?.value
  if (!id_user) return null

  const user = await prisma.user.findUnique({
    where: { id_user: parseInt(id_user) },
  })

  return user
}
