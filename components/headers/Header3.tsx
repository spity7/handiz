"use client";
import Link from "next/link";

import DarkModeToggler from "./DarkModeToggler";

export default function Header3() {
  return (
    <div className="topbar style-1">
      <div className="tf-container w-xl">
        <div className="topbar-inner d-flex justify-content-between align-items-center">
          <form
            action="#"
            className="form-search style-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <fieldset className="input-search">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search posts"
              />
              <div className="btn-submit">
                <button type="submit" className="btn-icon">
                  <i className="icon-search" />
                </button>
              </div>
            </fieldset>
          </form>
          <div className="wrap d-flex justify-content-end">
            <DarkModeToggler />
            <Link
              href={`/contact`}
              className="tf-btn style-2 animate-hover-btn btn-switch-text md-hide"
            >
              <span>
                <span className="btn-double-text" data-text="Let's Talk!">
                  Let's Talk!
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
