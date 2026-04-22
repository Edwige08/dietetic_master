import React from 'react';
import styles from './Dock.module.css';

export interface DockProps {
  homeUrl?: string;
  studyUrl?: string;
  profileUrl?: string;
  activeItem?: "home" | "study" | "profile" | "none";
}

export const Dock = ({ 
  homeUrl = "/", 
  studyUrl = "#",
  profileUrl = "/dashboard",
  activeItem,
}: DockProps) => {
  return (
    <nav className={styles.dock} aria-label="Navigation principale">
      <a href={homeUrl} className={activeItem === "home" ? styles.active : ""}>
        Home
      </a>
      <a href={studyUrl} className={activeItem === "study" ? styles.active : ""}>
        Study
      </a>
      <a href={profileUrl} className={activeItem === "profile" ? styles.active : ""}>
        Profile
      </a>
    </nav>
  );
};
