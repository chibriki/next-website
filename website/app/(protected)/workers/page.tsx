"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import style from "./page.module.scss";
import { AddWorker } from "@/app/сomponents/AddWorker/AddWorker";
import { EditWorker } from "@/app/сomponents/EditWorker/EditWorker";

type User = {
  id_user: number;
  name: string;
  position: string;
  role: string;
  phone_number: string;
  id_team: string;
};

export default function WorkersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/workers-list");
      const data = await res.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id_user: number) => {
    const res = await fetch(`/api/workers-delete/${id_user}`, {
      method: "DELETE",
    });
    window.location.reload();
  };

  return (
    <div className={style.container}>
      <div className={style.top_bar}>
        <h1>Workers</h1>
        <AddWorker />
      </div>

      <div className={style.scroll_container}>
        {users.length === 0 ? (
          <p style={{ color: "#fff" }}>Loading data..</p>
        ) : (
          users.map((user) => (
            <div key={user.id_user} className={style.worker_card}>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Position:</strong> {user.position}
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                {user.phone_number !== null ? user.phone_number : "none"}
              </p>
              <p>
                <strong>Team:</strong> {user.id_team}
              </p>
              <div>
                <EditWorker />
                <button onClick={() => handleDelete(user.id_user)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
