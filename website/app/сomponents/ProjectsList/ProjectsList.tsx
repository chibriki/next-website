import style from "./ProjectsList.module.scss";
import CreateModal from "./CreateModal";
import { StatusProject } from "@prisma/client";
import { useState } from "react";

export default function ProjectsList() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateProject = (projectData: {
        name_project: string;
        status: StatusProject;
        start_date: Date;
        end_date: Date;
        description?: string;
        id_lift: number;
        id_team: number;
    }) => {
        console.log(projectData);
    };

    return (
        <div className={style.container}>
            <button className={style.button} onClick={() => setIsModalOpen(true)}>Add Project</button>
            <CreateModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateProject}
            />
        </div>
    );
}
