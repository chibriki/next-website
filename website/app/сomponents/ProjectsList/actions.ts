'use server';

import prisma from "@/app/lib/db";
import { StatusProject } from "@prisma/client";

export async function createProject(formData: FormData) {
    const name_project = formData.get('name_project') as string;
    const status = formData.get('status') as StatusProject;
    const start_date = formData.get('start_date') as string;
    const end_date = formData.get('end_date') as string;
    const description = formData.get('description') as string;
    const id_lift = Number(formData.get('id_lift'));
    const id_team = Number(formData.get('id_team'));

    const project = await prisma.projects.create({
        data: { name_project, status, start_date, end_date, description, id_lift, id_team }
    });
    
    return project;
}       

export async function getProjects() {
    const projects = await prisma.projects.findMany();
    return projects;
}

export async function deleteProject(id: number) {
    await prisma.projects.delete({
        where: { id_project: id }
    });
    return true;
}

export async function updateProject(id: number, formData: FormData) {
    const name_project = formData.get('name_project') as string;
    const status = formData.get('status') as StatusProject;
    const start_date = formData.get('start_date') as string;
    const end_date = formData.get('end_date') as string;
    const description = formData.get('description') as string;
    const id_lift = Number(formData.get('id_lift'));
    const id_team = Number(formData.get('id_team'));

    const project = await prisma.projects.update({
        where: { id_project: id },
        data: { name_project, status, start_date, end_date, description, id_lift, id_team }
    });
    
    return project;
}
