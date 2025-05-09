"use client";

import { useState, useEffect } from "react";
import styles from "./EditProject.module.scss";
import { updateProject } from "../../lib/project";
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

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (projectData: Project) => void;
  project: Project | null;
}

export default function EditProject({
  isOpen,
  onClose,
  onSubmit,
  project,
}: EditModalProps) {
  const [formData, setFormData] = useState({
    name_project: "",
    start_date: new Date(),
    end_date: new Date(),
    description: "",
    id_lift: 0,
    id_team: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (project) {
      setFormData({
        name_project: project.name_project,
        start_date: new Date(project.start_date),
        end_date: new Date(project.end_date),
        description: project.description || "",
        id_lift: project.id_lift,
        id_team: project.id_team,
      });
    }
  }, [project]);

  if (!isOpen || !project) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "start_date" || name === "end_date") {
      setFormData((prev) => ({
        ...prev,
        [name]: new Date(value),
      }));
    } else if (name === "id_lift" || name === "id_team") {
      setFormData((prev) => ({
        ...prev,
        [name]: Number(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formDataObj = new FormData();
      formDataObj.append("name_project", formData.name_project);
      formDataObj.append("start_date", formData.start_date.toISOString());
      formDataObj.append("end_date", formData.end_date.toISOString());
      formDataObj.append("description", formData.description);
      formDataObj.append("id_lift", formData.id_lift.toString());
      formDataObj.append("id_team", formData.id_team.toString());

      const updatedProject = await updateProject(
        project.id_project,
        formDataObj
      );

      onSubmit(updatedProject);
      onClose();
    } catch (err) {
      console.error("Failed to update project:", err);
      setError("Failed to update project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }

    window.location.reload();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <h2>Edit Project</h2>
          <input
            type="text"
            placeholder="Project name"
            id="name_project"
            name="name_project"
            value={formData.name_project}
            onChange={handleChange}
            required
          />

          <label htmlFor="start_date">Start Date:</label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            value={formData.start_date.toISOString().split("T")[0]}
            onChange={handleChange}
            required
          />

          <label htmlFor="end_date">End Date:</label>
          <input
            type="date"
            id="end_date"
            name="end_date"
            value={formData.end_date.toISOString().split("T")[0]}
            onChange={handleChange}
            required
          />

          <textarea
            id="description"
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <label htmlFor="id_lift">Enter lift ID:</label>
          <input
            type="number"
            placeholder="Lift ID"
            id="id_lift"
            name="id_lift"
            value={formData.id_lift}
            onChange={handleChange}
            required
          />

          <select
            name="id_team"
            required
            value={formData.id_team}
            onChange={handleChange}
          >
            <option value="1">Team #1</option>
            <option value="2">Team #2</option>
          </select>

          <button
            type="submit"
            className={styles.saveButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
          <button type="button" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
