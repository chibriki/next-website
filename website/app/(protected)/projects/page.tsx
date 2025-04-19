"use client";

import style from "./projects.module.scss";
import ProjectsList from "@/app/сomponents/ProjectsList/ProjectsList";

export default function Home() {
  return(
    <div className={style.container}>
      <h1>Projects</h1>
      <ProjectsList />
    </div>
  );
}
