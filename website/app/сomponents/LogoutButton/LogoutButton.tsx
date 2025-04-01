'use client';

import React, { useState } from "react";
import style from  './styles.module.scss';  

export const LogoutButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const handleConfirmLogout = () => {

    console.log("Logging out...");

    setIsModalOpen(false);

    window.location.href = "/login_page";
  };

  return (
    <div>
      <button onClick={handleLogoutClick}>Logout</button>
      {isModalOpen && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <h2>Are you sure you want to log out?</h2>
            <button className={style.button} onClick={handleConfirmLogout}>Yes, Log Out</button>
            <button className={style.button} onClick={handleCloseModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};