"use client";

import { LoginForm } from "@/app/сomponents/BasicLogin";
import styles from "./loginPage.module.scss";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className={styles.pageContainer}>
      {/* Header Section */}
      <div className={styles.header_of_login}>
        <div className={styles.logo_container}>
          <Image src="/images_of_site/Logo.png" alt="BK System Logo" width={80} height={80} />
        </div>
        <div className={styles.header_title}>- LOGIN PAGE -</div>
        <div className={styles.user_image_section}>
          <div className={styles.user_image_container}>
            <Image src="/images_of_site/user_image.jpg" alt="User" width={50} height={50} className={styles.user_image} />
            <div className={styles.tooltip}>Not logged in</div>
          </div>
        </div>
      </div>

      {/* Central Login Form */}
      <div className={styles.central_container}>
        <div className={styles.login_container}>
          <div className={styles.main_text}>Welcome to BK SYSTEM</div>
          <LoginForm />  {/* Keeps functionality separate */}
        </div>
      </div>

      {/* Bottom Section */}
      <div className={styles.bottom_container}>
        <div className={styles.info_image_container}>
          <Image src="/images_of_site/information_thumbnail.png" alt="Info" width={40} height={40} className={styles.info_image} />
          <div className={styles.tooltip_info}>
            This system helps the elevator maintenance team at Bukovel manage projects and tasks easily.
          </div>
        </div>
      </div>
    </div>
  );
}
