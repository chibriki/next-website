'use client';

import React, { useState } from "react";
import style from  './LogoutButton.module.scss';  

export const LogoutButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const handleConfirmLogout = () => {

    setIsModalOpen(false);

    window.location.href = "/login_page";
  };

  return (
    <div>
      <button className = {style.button_logout} onClick={handleLogoutClick}>Log out</button>

      {isModalOpen && (
        <div className={style.modal}>  
          <div className={style.modal_content}>
            <h2>Are you sure you want to log out?</h2>
            <button className={style.modal_button} onClick={handleConfirmLogout}>Log out</button>
            <button className={style.modal_button_cancel} onClick={handleCloseModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};