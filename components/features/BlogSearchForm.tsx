"use client";

export default function BlogSearchForm() {
  return (
    <form
      action="#"
      className="form-search style-1"
      onSubmit={(e) => e.preventDefault()}
    >
      <fieldset className="input-search">
        <input
          type="text"
          name="search"
          id="search-2"
          placeholder="Searching...."
        />
      </fieldset>
      <div className="btn-submit">
        <button
          type="submit"
          className="btn-icon black-on-dark animate-hover-btn"
        >
          <i className="icon-search" />
        </button>
      </div>
    </form>
  );
}
