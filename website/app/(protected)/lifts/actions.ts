'use server';

import prisma from '../../lib/db';

export async function getLiftsWithProjects() {
  const lifts = await prisma.lifts.findMany({
    include: {
      projects: {
        select: {
          id_project: true,
          name_project: true,
          status: true,
        },
      },
    },
    orderBy: {
      id_lift: 'asc',
    },
  });

  return lifts;
}
