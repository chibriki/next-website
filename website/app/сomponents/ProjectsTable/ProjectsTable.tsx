import { useEffect, useState } from "react";
import { getProjects, deleteProject } from "../../lib/project";
import styles from "./ProjectsList.module.scss";
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

interface ProjectsTableProps {
  onEditProject: (project: Project) => void;
}

export default function ProjectsTable({ onEditProject }: ProjectsTableProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
      if (data.length > 0 && !selectedProject) {
        setSelectedProject(data[0]);
      }
    } catch (err) {
      setError("Failed to load projects");
      console.error("Error fetching projects:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleRowClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleEditClick = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    onEditProject(project);
  };

  const handleDeleteClick = async (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();

    if (
      window.confirm(
        `Are you sure you want to delete project "${project.name_project}"?`
      )
    ) {
      setIsDeleting(true);
      try {
        await deleteProject(project.id_project);
        await fetchProjects();

        if (selectedProject?.id_project === project.id_project) {
          setSelectedProject(null);
        }
      } catch (err) {
        console.error("Error deleting project:", err);
        alert("Failed to delete project. Please try again.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading projects...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (projects.length === 0) {
    return <div className={styles.empty}>No projects found</div>;
  }

  return (
    <div className={styles.tableLayout}>
      <div className={styles.tableContainer}>
        <table className={styles.projectsTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Project Name</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Description</th>
              <th>Lift ID</th>
              <th>Team ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id_project}
                onClick={() => handleRowClick(project)}
                className={
                  selectedProject?.id_project === project.id_project
                    ? styles.selectedRow
                    : ""
                }
              >
                <td>{project.id_project}</td>
                <td>{project.name_project}</td>
                <td>
                  <span
                    className={`${styles.status} ${
                      styles[project.status.toLowerCase()]
                    }`}
                  >
                    {project.status}
                  </span>
                </td>
                <td>{new Date(project.start_date).toLocaleDateString()}</td>
                <td>
                  {project.end_date
                    ? new Date(project.end_date).toLocaleDateString()
                    : "-"}
                </td>
                <td>{project.description || "-"}</td>
                <td>{project.id_lift}</td>
                <td>{project.id_team}</td>
                <td className={styles.actions}>
                  <button
                    className={styles.editButton}
                    onClick={(e) => handleEditClick(e, project)}
                    disabled={isDeleting}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={(e) => handleDeleteClick(e, project)}
                    disabled={isDeleting}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedProject && (
        <div className={styles.projectInfo}>
          <div className={styles.projectInfoHeader}>
            <h2>{selectedProject.name_project}</h2>
            <p>Project ID: {selectedProject.id_project}</p>
            <div className={styles.projectInfoActions}>
              <button
                className={styles.editButton}
                onClick={() => onEditProject(selectedProject)}
              >
                Edit Project
              </button>
              <button
                className={styles.deleteButton}
                onClick={() =>
                  handleDeleteClick(new Event("click") as any, selectedProject)
                }
                disabled={isDeleting}
              >
                Delete Project
              </button>
            </div>
          </div>

          <div className={styles.projectInfoSection}>
            <h3>Project Details</h3>
            <div className={styles.projectInfoItem}>
              <span>Status</span>
              <span
                className={`${styles.projectInfoStatus} ${
                  styles[selectedProject.status.toLowerCase()]
                }`}
              >
                {selectedProject.status}
              </span>
            </div>
            <div className={styles.projectInfoItem}>
              <span>Start Date</span>
              <span>
                {new Date(selectedProject.start_date).toLocaleDateString()}
              </span>
            </div>
            <div className={styles.projectInfoItem}>
              <span>End Date</span>
              <span>
                {selectedProject.end_date
                  ? new Date(selectedProject.end_date).toLocaleDateString()
                  : "Not set"}
              </span>
            </div>
            <div className={styles.projectInfoItem}>
              <span>Lift ID</span>
              <span>{selectedProject.id_lift}</span>
            </div>
            <div className={styles.projectInfoItem}>
              <span>Team ID</span>
              <span>{selectedProject.id_team}</span>
            </div>
          </div>

          <div className={styles.projectInfoDescription}>
            <h4>Description</h4>
            <p>{selectedProject.description || "No description provided"}</p>
          </div>
        </div>
      )}
    </div>
  );
}
