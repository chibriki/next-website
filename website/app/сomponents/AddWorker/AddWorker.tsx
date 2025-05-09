"use client";

import React, { useState } from "react";
import style from "./AddWorker.module.scss";

export const AddWorker = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    position: "",
    name: "",
    role: "",
    phone_number: "",
    id_team: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Form Data Submitted:", formData);

    const res = await fetch("/api/add-worker", {
      method: "POST",
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
        Add Worker
      </button>

      {isModalOpen && (
        <div>
          <div className={style.formContainer}>
            <form onSubmit={handleSubmit}>
              <h2>Add Worker</h2>
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                onChange={handleChange}
              />
              <select name="position" required onChange={handleChange}>
                <option value="" disabled selected>
                  Select Role
                </option>
                <option value="MECHANIC">Mechanic</option>
                <option value="HEAD_MECHANIC">Head Mechanic</option>
                <option value="LOCKSMITH">Locksmith</option>
                <option value="SHIFT_MANAGER">Shift Manager</option>
              </select>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                onChange={handleChange}
              />
              <select name="role" required onChange={handleChange}>
                <option value="" disabled selected>
                  Select Role
                </option>
                <option value="ADMIN">Admin</option>
                <option value="WORKER">Worker</option>
              </select>
              <input
                type="tel"
                name="phone_number"
                placeholder="Phone Number"
                onChange={handleChange}
              />
              <select name="id_team" required onChange={handleChange}>
                <option value="" disabled selected>
                  Select Team
                </option>
                <option value="1">Team #1</option>
                <option value="2">Team #2</option>
              </select>

              <button type="submit">Submit</button>
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
