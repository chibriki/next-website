'use client';

import React, { useState } from "react";
import style from  './styles.module.scss';  // Import the SCSS file for modal styles

export const LogoutButton = () => {
  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle logout confirmation
  const handleConfirmLogout = () => {
    // Here, you would add logic to log out the user
    console.log("Logging out...");

    // Redirect to login page or handle the logout action
    // You can clear cookies, localStorage, etc., or make an API call

    // Close the modal after confirming logout
    setIsModalOpen(false);

    // Redirect to login page (for example)
    window.location.href = "/login_page";
  };

  return (
    <div>
      <button onClick={handleLogoutClick}>Logout</button>

      {/* Modal */}
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