"use client";

import { useEffect, useState } from "react";
import ProjectsTable from "@/app/сomponents/ProjectsTable/ProjectsTable";
import CreateModal from "@/app/сomponents/CreateProject/CreateProject";
import EditProject from "@/app/сomponents/EditProject/EditProject";
import styles from "./page.module.scss";
import { StatusProject } from "@prisma/client";

interface Project {
  id_project: number;
  name_project: string;
  status: StatusProject;
  start_date: Date;
  end_date: Date;
  description: string | null;
  id_lift: number;
  id_team: number;
}

export default function Projects() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [userRole, setUserRole] = useState<string>("worker");

  useEffect(() => {
    // Get userRole from cookies
    const cookies = document.cookie
      .split("; ")
      .reduce((acc: any, cookieStr) => {
        const [key, value] = cookieStr.split("=");
        acc[key] = value;
        return acc;
      }, {});
    const role = cookies["userRole"];
    setUserRole(role ?? "worker");
  }, []);

  const handleCreateProject = (projectData: {
    name_project: string;
    start_date: Date;
    end_date: Date;
    description?: string;
    id_lift: number;
    id_team: number;
  }) => {
    setIsCreateModalOpen(false);
  };

  const handleEditProject = (project: Project) => {
    setProjectToEdit(project);
    setIsEditModalOpen(true);
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setIsEditModalOpen(false);
    setProjectToEdit(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Projects</h1>
        {userRole === "ADMIN" && (
          <button
            className={styles.createButton}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create New Project
          </button>
        )}
      </div>

      <ProjectsTable onEditProject={handleEditProject} userRole={userRole} />

      <>
        <CreateModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateProject}
        />
        <EditProject
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setProjectToEdit(null);
          }}
          onSubmit={handleUpdateProject}
          project={projectToEdit}
        />
      </>
    </div>
  );
}
