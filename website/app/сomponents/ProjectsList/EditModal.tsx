'use client';

import { useState, useEffect } from 'react';
import styles from './ProjectsList.module.scss';
import { updateProject } from './actions';
import { StatusProject } from '@prisma/client';

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

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (projectData: Project) => void;
  project: Project | null;
}

export default function EditModal({ isOpen, onClose, onSubmit, project }: EditModalProps) {
  const [formData, setFormData] = useState({
    name_project: '',
    status: StatusProject.ONGOING,
    start_date: new Date(),
    end_date: new Date(),
    description: '',
    id_lift: 0,
    id_team: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update form data when project changes
  useEffect(() => {
    if (project) {
      setFormData({
        name_project: project.name_project,
        status: project.status,
        start_date: new Date(project.start_date),
        end_date: project.end_date ? new Date(project.end_date) : new Date(),
        description: project.description || '',
        id_lift: project.id_lift,
        id_team: project.id_team
      });
    }
  }, [project]);

  if (!isOpen || !project) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'start_date' || name === 'end_date') {
      setFormData(prev => ({
        ...prev,
        [name]: new Date(value)
      }));
    } else if (name === 'id_lift' || name === 'id_team') {
      setFormData(prev => ({
        ...prev,
        [name]: Number(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Create a FormData object to pass to the server action
      const formDataObj = new FormData();
      formDataObj.append('name_project', formData.name_project);
      formDataObj.append('status', formData.status);
      formDataObj.append('start_date', formData.start_date.toISOString());
      formDataObj.append('end_date', formData.end_date.toISOString());
      formDataObj.append('description', formData.description);
      formDataObj.append('id_lift', formData.id_lift.toString());
      formDataObj.append('id_team', formData.id_team.toString());
      
      // Call the server action
      const updatedProject = await updateProject(project.id_project, formDataObj);
      
      // Pass the updated project data to the parent component
      onSubmit(updatedProject);
      
      onClose();
    } catch (err) {
      console.error('Failed to update project:', err);
      setError('Failed to update project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Edit Project</h2>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name_project">Project Name:</label>
            <input
              type="text"
              id="name_project"
              name="name_project"
              value={formData.name_project}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              {Object.values(StatusProject).map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="start_date">Start Date:</label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              value={formData.start_date.toISOString().split('T')[0]}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="end_date">End Date:</label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              value={formData.end_date.toISOString().split('T')[0]}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="id_lift">Lift ID:</label>
            <input
              type="number"
              id="id_lift"
              name="id_lift"
              value={formData.id_lift}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="id_team">Team ID:</label>
            <input
              type="number"
              id="id_team"
              name="id_team"
              value={formData.id_team}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.buttonGroup}>
            <button 
              type="submit" 
              className={styles.saveButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
            <button 
              type="button" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 