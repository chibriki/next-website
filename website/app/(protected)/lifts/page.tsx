"use client";

import { useEffect, useState } from "react";
import { getLiftsWithProjects } from "./actions";
import styles from "./page.module.scss";

type Lift = {
  id_lift: number;
  name_lift: string;
  status: string;
  projects: {
    id_project: number;
    name_project: string;
    status: string;
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

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lifts</h1>
      {lifts.map((lift) => (
        <div key={lift.id_lift} className={styles.liftCard}>
          <div className={styles.liftHeader}>
            <div>
              <strong>ID:</strong> {lift.id_lift} | <strong>Name:</strong>{" "}
              {lift.name_lift} | <strong>Status:</strong> {lift.status}
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
                    <strong>{project.name_project}</strong> — {project.status}
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
