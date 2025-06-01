// actions.ts
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
          end_date: true,
          start_date: true
        },
      },
    },
    orderBy: {
      id_lift: 'asc',
    },
  });

  const updatedLifts = [];

  for (const lift of lifts) {
    const hasOngoingProject = lift.projects.some(
      project => project.status === "ONGOING"
    );

    const completedProjects = lift.projects.filter(
      project => project.status === "COMPLETE" && project.end_date !== null
    );

    const latestEndDate = completedProjects
      .map(project => new Date(project.end_date!))
      .sort((a, b) => b.getTime() - a.getTime())[0] || null;

    const newStatus = hasOngoingProject ? "IN_MAINTENANCE" : "IN_SERVICE";

    await prisma.lifts.update({
      where: { id_lift: lift.id_lift },
      data: {
        status: newStatus,
        last_maintenance: latestEndDate,
      },
    });

    updatedLifts.push({
      ...lift,
      status: newStatus,
      last_maintenance: latestEndDate ? latestEndDate.toISOString() : null,
      projects: lift.projects.map(project => ({
        ...project,
        end_date: project.end_date
          ? new Date(project.end_date).toISOString()
          : null,
      })),
    });
  }

  return updatedLifts;
}
