"use client";
import React, { useState, useEffect } from "react";

if (typeof window !== "undefined") {
  const stored = localStorage.getItem("darkMode");
  const darkDefault = stored !== null ? JSON.parse(stored) : true;
  if (darkDefault) document.body.classList.add("dark-mode");
}

export default function DarkModeToggler() {
  // Initialize state from localStorage or default to false
  const [show, setShow] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("darkMode");
      return stored !== null ? JSON.parse(stored) : true;
    }
    return true;
  });

  const toggleMode = () => {
    setDarkMode((prev: boolean) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return newMode;
    });
  };
  useEffect(() => {
    setShow(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <>
      {show && (
        <div
          className="mode-check"
          onClick={toggleMode}
          style={{ cursor: "pointer" }}
        >
          <span className="label light sm-hide">Light</span>
          <div
            className={`toggle toggle-switch-mode ${darkMode ? "active" : ""}`}
          >
            <div className="toggle-button" />
          </div>
          <span className="label dark">Dark</span>
        </div>
      )}
    </>
  );
}
