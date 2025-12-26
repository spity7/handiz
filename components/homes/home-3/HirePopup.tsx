"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function HirePopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 2000);
    return () => clearTimeout(timer); // cleanup
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      {show ? (
        <div
          className="auto-popup effect-bottom"
          data-effect="bottom"
          style={{ display: "block" }}
        >
          <div className="popup-hire-me d-flex align-items-center">
            <div className="avatar">
              <img
                alt=""
                src="/images/avatar/avatar-1.jpg"
                width={100}
                height={100}
              />
            </div>
            <div className="content">
              <h5 className="text_white">Available For Hire</h5>
              <p className="text-body-1 text_white">Availability: 2 Hours</p>
            </div>
            <Link
              href={`/contact`}
              className="tf-btn btn-white btn-switch-text"
            >
              <span>
                <span className="btn-double-text" data-text="Hire Me">
                  Hire Me
                </span>
              </span>
            </Link>
            <div className="close-btn" onClick={handleClose}>
              <i className="icon-XCircle" />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
