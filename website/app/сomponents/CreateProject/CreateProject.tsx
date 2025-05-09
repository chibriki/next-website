"use client";

import { useState } from "react";
import styles from "./CreateProject.module.scss";
import { createProject } from "@/app/lib/project";

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (projectData: {
    name_project: string;
    start_date: Date;
    end_date: Date;
    description?: string;
    id_lift: number;
    id_team: number;
  }) => void;
}

export default function CreateModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateModalProps) {
  const [formData, setFormData] = useState({
    name_project: "",
    start_date: new Date(),
    end_date: new Date(),
    description: "",
    id_lift: 0,
    id_team: 0,
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Create a FormData object to pass to the server action
      const formDataObj = new FormData();
      formDataObj.append("name_project", formData.name_project);
      formDataObj.append("start_date", formData.start_date.toISOString());
      formDataObj.append("end_date", formData.end_date.toISOString());
      formDataObj.append("description", formData.description);
      formDataObj.append("id_lift", formData.id_lift.toString());
      formDataObj.append("id_team", formData.id_team.toString());

      // Call the server action
      const savedProject = await createProject(formDataObj);

      // Pass the project data to the parent component
      onSubmit({
        ...savedProject,
        description: savedProject.description || undefined,
      });

      onClose();
    } catch (error) {
      console.error("Failed to create project:", error);
      throw new Error("Failed to create project");
    }
    window.location.reload();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes("date") ? new Date(value) : value,
    }));
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <h2>Create New Project</h2>
          <input
            type="text"
            placeholder="Project name"
            id="name_project"
            name="name_project"
            value={formData.name_project}
            onChange={handleChange}
            required
          />

          <label htmlFor="end_date">Start Date:</label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            placeholder="Start date"
            value={formData.start_date.toISOString().split("T")[0]}
            onChange={handleChange}
            required
          />

          <label htmlFor="end_date">End Date:</label>
          <input
            type="date"
            id="end_date"
            name="end_date"
            placeholder="End date"
            value={formData.end_date.toISOString().split("T")[0]}
            onChange={handleChange}
            required
          />

          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <label htmlFor="id_lift">Enter lift ID:</label>
          <input
            type="number"
            id="id_lift"
            name="id_lift"
            placeholder="Lift ID"
            value={formData.id_lift}
            onChange={handleChange}
            required
          />

          <select
            name="id_team"
            value={formData.id_team === 0 ? "" : formData.id_team}
            required
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Team
            </option>
            <option value="1">Team #1</option>
            <option value="2">Team #2</option>
          </select>

          <button type="submit">Create Project</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
