import React from 'react';
import styles from './Navbar.module.css';

export interface NavbarProps {
  homeUrl?: string;
  studyUrl?: string;
  profileUrl?: string;
  activeItem?: "home" | "study" | "profile" | "none";
}

export const Navbar = ({ 
  homeUrl = "/", 
  studyUrl = "#",
  profileUrl = "/dashboard",
  activeItem,
}: NavbarProps) => {
  return (
    <nav className={styles.navbar} aria-label="Navigation principale">
      <a href={homeUrl}>
        <h3>Dietetic Master</h3>
      </a>
      <div className={styles['navbar-links']}>
        <a href={homeUrl} className={activeItem === "home" ? styles.active : ""}>
          Home
        </a>
        <a href={studyUrl} className={activeItem === "study" ? styles.active : ""}>
          Study
        </a>
        <a href={profileUrl} className={activeItem === "profile" ? styles.active : ""}>
          Profile
        </a>
      </div>
    </nav>
  );
};
