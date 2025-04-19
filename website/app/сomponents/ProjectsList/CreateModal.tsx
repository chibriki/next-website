"use client";

import { useState } from "react";
import styles from "./ProjectsList.module.scss";
import { createProject } from "./actions";
import { StatusProject } from "@prisma/client";

interface CreateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (projectData: {
        name_project: string;
        status: StatusProject;
        start_date: Date;
        end_date: Date;
        description?: string;
        id_lift: number;
        id_team: number;
    }) => void;
}

export default function CreateModal({ isOpen, onClose, onSubmit }: CreateModalProps) {
    const [formData, setFormData] = useState({
        name_project: "",
        status: StatusProject.ONGOING,
        start_date: new Date(),
        end_date: new Date(),
        description: "",
        id_lift: 0,
        id_team: 0
    });

    if (!isOpen) return null;

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
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
            const savedProject = await createProject(formDataObj);
            
            // Pass the project data to the parent component
            onSubmit({
                ...savedProject,
                description: savedProject.description || undefined
            });
            
            onClose();
        } catch (error) {
            console.error('Failed to create project:', error);
            throw new Error('Failed to create project');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name.includes('date') ? new Date(value) : value
        }));
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Create New Project</h2>
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
                        <button type="submit">Create Project</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
