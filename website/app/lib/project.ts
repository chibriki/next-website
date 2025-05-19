'use server';

import prisma from "@/app/lib/db";
import { StatusProject } from "@prisma/client";

// Determine status based on current date and project dates
function getStatusFromDates(start: Date, end: Date): StatusProject {
  const now = new Date();
  if (now > end) return "COMPLETE";
  if (now < start) return "PLANNED";
  return "ONGOING";
}

export async function createProject(formData: FormData) {
  const name_project = formData.get('name_project') as string;
  const start_date = new Date(formData.get('start_date') as string);
  const end_date = new Date(formData.get('end_date') as string);
  const description = formData.get('description') as string | null;
  const id_lift = Number(formData.get('id_lift'));
  const id_team = Number(formData.get('id_team'));

  const status = getStatusFromDates(start_date, end_date);

  return await prisma.projects.create({
    data: {
      name_project,
      status,
      start_date,
      end_date,
      description,
      id_lift,
      id_team,
    },
  });
}

export async function getProjects() {
  const projects = await prisma.projects.findMany();

  const updatedProjects = await Promise.all(
    projects.map(async (project) => {
      const currentStatus = getStatusFromDates(
        new Date(project.start_date),
        new Date(project.end_date)
      );

      if (currentStatus !== project.status) {
        await prisma.projects.update({
          where: { id_project: project.id_project },
          data: { status: currentStatus },
        });

        return { ...project, status: currentStatus };
      }

      return project;
    })
  );

  return updatedProjects;
}

export async function deleteProject(id: number) {
  await prisma.projects.delete({
    where: { id_project: id },
  });
  return true;
}

export async function updateProject(id: number, formData: FormData) {
  const name_project = formData.get('name_project') as string;
  const start_date = new Date(formData.get('start_date') as string);
  const end_date = new Date(formData.get('end_date') as string);
  const description = formData.get('description') as string | null;
  const id_lift = Number(formData.get('id_lift'));
  const id_team = Number(formData.get('id_team'));

  const status = getStatusFromDates(start_date, end_date);

  return await prisma.projects.update({
    where: { id_project: id },
    data: {
      name_project,
      status,
      start_date,
      end_date,
      description,
      id_lift,
      id_team,
    },
  });
}
