'use client';
import { useRouter } from "next/navigation";
import style from "./page.module.scss"

export default function projects() {
  const router = useRouter();

  return (
    <div className={style.container}>
       <button
        onClick={() => router.push("/create_project")} className={style.redirect_button}> Create new project
      </button>
    </div>
  );
}

