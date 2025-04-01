'use client';

import React, { useState } from "react";
import style from  './styles.module.scss';  

export const LogoutButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <div>
      <button>Add worker</button>
    </div>
  );
};