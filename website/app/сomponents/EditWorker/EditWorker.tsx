"use client";

import React, { useState } from "react";
import style from "./EditWorker.module.scss";

type EditWorkerProps = {
  user: {
    id_user: number;
    username: string;
    position: string;
    name: string;
    role: string;
    phone_number: string;
    id_team: number;
  };
};

export const EditWorker = ({ user }: EditWorkerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (!user) return null;
  const [formData, setFormData] = useState({
    username: user.username,
    position: user.position,
    name: user.name,
    role: user.role,
    phone_number: user.phone_number || "",
    id_team: String(user.id_team),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch(`/api/workers-edit/${user.id_user}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    setIsModalOpen(false);
    window.location.reload();
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)} className={style.button}>
        Edit
      </button>

      {isModalOpen && (
        <div className={style.modalOverlay}>
          <div className={style.formContainer}>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                required
                onChange={handleChange}
              />
              <select
                name="position"
                required
                value={formData.position}
                onChange={handleChange}
              >
                <option value="MECHANIC">Mechanic</option>
                <option value="HEAD_MECHANIC">Head Mechanic</option>
              </select>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={handleChange}
              />
              <select
                name="role"
                required
                value={formData.role}
                onChange={handleChange}
              >
                <option value="ADMIN">Admin</option>
                <option value="WORKER">Worker</option>
              </select>
              <input
                type="tel"
                name="phone_number"
                placeholder="Phone Number"
                value={formData.phone_number}
                onChange={handleChange}
              />
              <select
                name="id_team"
                required
                value={formData.id_team}
                onChange={handleChange}
              >
                <option value="1">Team #1</option>
                <option value="2">Team #2</option>
              </select>

              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
