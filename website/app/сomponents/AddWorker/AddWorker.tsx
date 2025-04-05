'use client';

import React, { useState } from "react";


export const AddWorker = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    position: "USER",
    name: "",
    role: "EMPLOYEE",
    phone_number: "",
    id_team: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));

  
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Add Worker</button>

      {isModalOpen && (
        <div>
          <div>
            <form onSubmit={handleSubmit}>
              <input type="text" name="username" placeholder="Username" required onChange={handleChange} />
              <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
              <select name="position" required onChange={handleChange}>
                <option value="FILTER">Filter</option>
                <option value="MECHANIC">Mechanic</option>
                <option value="HEAD_MECHANIC">Head Mechanic</option>
              </select>
              <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
              <select name="role" required onChange={handleChange}>
                <option value="ADMIN">Admin</option>
                <option value="WORKER">Worker</option>
              </select>
              <input type="tel" name="phone_number" placeholder="Phone Number" onChange={handleChange} />
              <input type="number" name="id_team" placeholder="Team ID" onChange={handleChange} />

              <button type="submit">Submit</button>
              <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
