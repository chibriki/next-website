'use client';

import React, { useState } from "react";
import style from './LogoutButton.module.scss';
import { deleteCookie } from 'cookies-next';

export const LogoutButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirmLogout = () => {
    deleteCookie('userRole', { path: '/' });
    
    setIsModalOpen(false);
    window.location.href = "/login";
  };

  return (
    <div>
      <button className={style.button_logout} onClick={() => setIsModalOpen(true)}>Log out</button>

      {isModalOpen && (
        <div className={style.modal_overlay}>
          <div className={style.modal_content}>
            <h2>Are you sure you want to log out?</h2>
            <button className={style.modal_button} onClick={handleConfirmLogout}>Log out</button>
            <button className={style.modal_button_cancel} onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};