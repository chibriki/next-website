'use client';
import { useRouter } from "next/navigation";
import style from "./page.module.scss"
import { AddWorker } from "@/app/сomponents/AddWorker/AddWorker";

export default function projects() {
  const router = useRouter();

  return (
    <div className={style.container}>
       <h1>Workers</h1>
       <AddWorker />
    </div>
  );
}

