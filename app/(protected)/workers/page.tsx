"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import style from "./page.module.scss";
import { AddWorker } from "@/app/сomponents/AddWorker/AddWorker";
import { EditWorker } from "@/app/сomponents/EditWorker/EditWorker";

type User = {
  username: string;
  password: string;
  id_user: number;
  name: string;
  position: string;
  role: string;
  phone_number: string;
  id_team: number;
};

export default function WorkersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [userRole, setUserRole] = useState<string>("worker"); // default to "worker"

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/workers-list");
      const data = await res.json();
      setUsers(data);
    };

    // Parse document.cookie using custom logic
    const cookies = document.cookie
      .split("; ")
      .reduce((acc: any, cookieStr) => {
        const [key, value] = cookieStr.split("=");
        acc[key] = value;
        return acc;
      }, {});
    const role = cookies["userRole"];
    setUserRole(role ?? "worker");

    fetchUsers();
  }, []);

  const handleDelete = async (id_user: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmed) {
      await fetch(`/api/workers-delete/${id_user}`, {
        method: "DELETE",
      });
      router.refresh();
    }
  };

  const formatLabel = (str: string) => {
    return str
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className={style.container}>
      <div className={style.top_bar}>
        <h1>Workers</h1>
        {userRole === "ADMIN" && <AddWorker />}
      </div>

      <div className={style.scroll_container}>
        {users.length === 0 ? (
          <p style={{ color: "#fff" }}>Loading data...</p>
        ) : (
          users.map((user) => (
            <div key={user.id_user} className={style.worker_card}>
              <p>
                <strong>Position:</strong> {formatLabel(user.position)}
              </p>
              <p>
                <strong>Role:</strong> {formatLabel(user.role)}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone_number || "none"}
              </p>
              <p>
                <strong>Team:</strong> {user.id_team}
              </p>

              <div>
                <p>
                  <strong>Name:</strong> {user.name}
                </p>

                {userRole === "ADMIN" && (
                  <div className={style.buttons_container}>
                    <EditWorker user={user} />
                    <button
                      className={style.button}
                      onClick={() => handleDelete(user.id_user)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
