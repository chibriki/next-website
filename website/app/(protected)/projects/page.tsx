"use client";

import { useState } from "react";
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
  end_date: Date | null;
  description: string | null;
  id_lift: number;
  id_team: number;
}

export default function Projects() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  const handleCreateProject = (projectData: {
    name_project: string;
    status: StatusProject;
    start_date: Date;
    end_date: Date;
    description?: string;
    id_lift: number;
    id_team: number;
  }) => {
    // Refresh the table after creating a new project
    // This will be handled by the ProjectsTable component's useEffect
    setIsCreateModalOpen(false);
  };

  const handleEditProject = (project: Project) => {
    setProjectToEdit(project);
    setIsEditModalOpen(true);
  };

  const handleUpdateProject = (updatedProject: Project) => {
    // The table will refresh automatically when the modal closes
    setIsEditModalOpen(false);
    setProjectToEdit(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Projects</h1>
        <button
          className={styles.createButton}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create New Project
        </button>
      </div>

      <ProjectsTable onEditProject={handleEditProject} />

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
    </div>
  );
}
