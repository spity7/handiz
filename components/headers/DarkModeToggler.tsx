"use client";
import React, { useState, useEffect } from "react";

export default function DarkModeToggler() {
  const [show, setShow] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const toggleMode = () => {
    setDarkMode((prev: boolean) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return newMode;
    });
  };
  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    const initial = stored !== null ? JSON.parse(stored) : true;
    setDarkMode(initial);
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
