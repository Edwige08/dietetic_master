import React from 'react';
import styles from './Dock.module.css';
import { GraduationCapIcon  , UserIcon, HouseIcon } from "@phosphor-icons/react";

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
        <HouseIcon size={24} />
        <p>
          Home
        </p>
      </a>
      <a href={studyUrl} className={activeItem === "study" ? styles.active : ""}>
        <GraduationCapIcon  size={24} />
        <p>
          Study
        </p>
      </a>
      <a href={profileUrl} className={activeItem === "profile" ? styles.active : ""}>
        <UserIcon size={24} />
        <p>
          Profile
        </p>
      </a>
    </nav>
  );
};
