"use client";

import { useEffect, useState } from "react";
import { getLiftsWithProjects } from "./actions";
import styles from "./page.module.scss";

type Lift = {
  id_lift: number;
  name_lift: string;
  status: string;
  last_maintenance?: string | null;
  projects: {
    id_project: number;
    name_project: string;
    status: string;
    end_date: string | null;
    start_date: Date | null;
  }[];
};

export default function LiftsPage() {
  const [lifts, setLifts] = useState<Lift[]>([]);
  const [expandedLiftIds, setExpandedLiftIds] = useState<Set<number>>(
    new Set()
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLiftsWithProjects();
      setLifts(data);
    };
    fetchData();
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedLiftIds((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const formatLabel = (str: string) => {
    return str
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className={styles.container}>
      <div className={styles.top_bar}>
        <h1>Lifts</h1>
      </div>
      <div className={styles.scroll_container}>
        {lifts.map((lift) => (
          <div key={lift.id_lift} className={styles.liftCard}>
            <div className={styles.liftHeader}>
              <div>
                <strong>ID:</strong> {lift.id_lift} | <strong>Name:</strong>{" "}
                {lift.name_lift} | <strong>Status:</strong>{" "}
                {formatLabel(lift.status)}
                {lift.last_maintenance && (
                  <>
                    {" "}
                    | <strong>Last Maintenance:</strong>{" "}
                    {new Date(lift.last_maintenance).toLocaleDateString()}
                  </>
                )}
              </div>
              <button
                onClick={() => toggleExpand(lift.id_lift)}
                className={styles.toggleBtn}
              >
                {expandedLiftIds.has(lift.id_lift)
                  ? "Hide Projects"
                  : "Show Projects"}
              </button>
            </div>

            {expandedLiftIds.has(lift.id_lift) && (
              <ul className={styles.projectList}>
                {lift.projects.length === 0 ? (
                  <li>No projects assigned to this lift.</li>
                ) : (
                  lift.projects.map((project) => (
                    <li key={project.id_project}>
                      <strong>{project.name_project}</strong> - {project.status}
                      {project.status === "PLANNED" && project.start_date && (
                        <>
                          {" "}
                          | <strong>Start:</strong>{" "}
                          {new Date(project.start_date).toLocaleDateString()}
                        </>
                      )}
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
