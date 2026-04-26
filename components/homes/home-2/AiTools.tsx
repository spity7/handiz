"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";

/** Preferred chip order when a category exists in the data */
const CATEGORY_SORT_ORDER = ["Diagram", "Render", "Facade"] as const;

type AiCategoryRef = { _id: string; name: string; isFallback?: boolean };

interface AiPrompt {
  _id: string;
  title: string;
  category: string | AiCategoryRef;
  description?: string;
  order: number;
  thumbnailUrl: string;
  createdAt: string;
}

function categoryLabel(cat: AiPrompt["category"]): string {
  if (cat == null) return "";
  if (typeof cat === "string") return cat.trim();
  return (cat.name ?? "").trim();
}

/** Plain text from HTML (for previews, line-clamp, clipboard). */
function stripHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function descriptionPlain(html: string | undefined): string {
  const t = stripHtml(html ?? "");
  return t || "No description yet.";
}

function normalizeQuillValue(value: string | undefined): string {
  if (!value || value === "<p><br></p>" || value === "<br/>") return "";
  return value;
}

export default function AiTools() {
  const [prompts, setPrompts] = useState<AiPrompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<AiPrompt | null>(null);
  /** Tracks which control last copied: modal (`"modal"`) or card id */
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}aiTools`, {
          cache: "no-store",
        });

        const data = await res.json();
        const list: AiPrompt[] = Array.isArray(data.aiTools)
          ? data.aiTools
          : [];
        const sorted = [...list].sort((a, b) => a.order - b.order);
        setPrompts(sorted);
      } catch (error) {
        console.error("Failed to fetch AI prompts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, []);

  const availableCategories = useMemo(() => {
    const seen = new Set<string>();
    for (const p of prompts) {
      const c = categoryLabel(p.category);
      if (c) seen.add(c);
    }
    const list = Array.from(seen);
    const order = new Map<string, number>(
      CATEGORY_SORT_ORDER.map((c, i) => [c, i]),
    );
    list.sort((a, b) => {
      const ia = order.get(a) ?? CATEGORY_SORT_ORDER.length;
      const ib = order.get(b) ?? CATEGORY_SORT_ORDER.length;
      if (ia !== ib) return ia - ib;
      return a.localeCompare(b);
    });
    return list;
  }, [prompts]);

  useEffect(() => {
    const valid = new Set(availableCategories);
    setSelectedCategories((prev) => prev.filter((c) => valid.has(c)));
  }, [availableCategories]);

  useEffect(() => {
    const checkDarkMode = () => {
      if (typeof document !== "undefined" && document.body) {
        setIsDark(document.body.classList.contains("dark-mode"));
      }
    };
    checkDarkMode();
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          checkDarkMode();
        }
      });
    });
    if (typeof document !== "undefined" && document.body) {
      observer.observe(document.body, { attributes: true });
    }
    return () => observer.disconnect();
  }, []);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const filteredPrompts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return prompts.filter((p) => {
      const matchesCategories =
        selectedCategories.length === 0 ||
        selectedCategories.includes(categoryLabel(p.category));
      if (!matchesCategories) return false;
      if (!q) return true;
      const hay = `${p.title} ${stripHtml(p.description ?? "")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [prompts, selectedCategories, searchQuery]);

  const closeModal = useCallback(() => {
    setSelected(null);
    setCopiedKey(null);
  }, []);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [selected, closeModal]);

  const openPrompt = (p: AiPrompt) => {
    setCopiedKey(null);
    setSelected(p);
  };

  const copyPlainDescription = async (
    html: string | undefined,
    key: string,
  ) => {
    try {
      await navigator.clipboard.writeText(stripHtml(html ?? ""));
      setCopiedKey(key);
      window.setTimeout(() => {
        setCopiedKey((k) => (k === key ? null : k));
      }, 2000);
    } catch {
      setCopiedKey(null);
    }
  };

  return (
    <>
      {loading && (
        <div className="tf-container w-xxl pt-5">
          <div
            style={{
              minHeight: "260px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div className="spinner" />
            <p className="text-body-1">Loading AI prompts…</p>
          </div>
        </div>
      )}

      {!loading && (
        <div className="page-title homepage-2 sw-layout ai-prompts-filter-band">
          <div className="tf-container w-xxl pt-5">
            <div className="ai-prompts-toolbar">
              <form
                action="#"
                className="form-search"
                onSubmit={(e) => e.preventDefault()}
                style={{ width: "100%", marginBottom: "12px" }}
              >
                <fieldset className="input-search">
                  <input
                    type="text"
                    name="ai-prompts-search"
                    id="ai-prompts-search"
                    placeholder="Search AI prompts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoComplete="off"
                  />
                </fieldset>
                <div className="btn-submit">
                  <button
                    type="submit"
                    className="tf-btn animate-hover-btn btn-switch-text"
                  >
                    <span>
                      <span className="btn-double-text" data-text="Search">
                        Search
                      </span>
                    </span>
                  </button>
                </div>
              </form>

              {availableCategories.length > 0 && (
                <div className="ai-prompts-category-row">
                  {availableCategories.map((category) => {
                    const isActive = selectedCategories.includes(category);
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => toggleCategory(category)}
                        className="ai-prompts-category-chip tag h6"
                        style={{
                          backgroundColor: isDark
                            ? isActive
                              ? "#ffffff"
                              : "transparent"
                            : isActive
                              ? "#000000"
                              : "transparent",
                          color: isDark
                            ? isActive
                              ? "#000000"
                              : "#ffffff"
                            : isActive
                              ? "#ffffff"
                              : "#000000",
                          border: isDark
                            ? "1px solid white"
                            : "1px solid black",
                        }}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {!loading && (
        <div
          className="section-most-popular tf-spacing-1 ai-prompts-main"
          style={{ paddingTop: 0 }}
        >
          <div className="tf-container sw-layout">
            <div className="heading-section mb_16">
              <h3>AI Prompts</h3>
            </div>

            {filteredPrompts.length === 0 ? (
              <p className="text-body-1 text-center py-5 mb-0">
                No prompts match your search or filters.
              </p>
            ) : (
              <div className="tf-grid-layout lg-col-5 md-col-2 ai-prompts-grid">
                {filteredPrompts.map((p) => (
                  <div
                    className="feature-post-item style-default style-border hover-image-translate ai-prompt-card"
                    key={p._id}
                  >
                    <div className="img-style">
                      <Image
                        className="lazyload"
                        decoding="async"
                        loading="lazy"
                        fill
                        sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 20vw"
                        src={p.thumbnailUrl}
                        alt={p.title}
                        style={{ objectFit: "cover" }}
                      />

                      <div className="wrap-tag">
                        <span className="tag categories text-caption-2 text_white">
                          {categoryLabel(p.category)}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="overlay-link"
                        aria-label={`Open ${p.title}`}
                        onClick={() => openPrompt(p)}
                        style={{
                          border: "none",
                          padding: 0,
                          background: "transparent",
                          cursor: "pointer",
                        }}
                      />
                    </div>

                    <div className="content mb_24">
                      <h5 className="title">
                        <button
                          type="button"
                          onClick={() => openPrompt(p)}
                          className="link line-clamp-2 text-start w-100 border-0 bg-transparent p-0"
                          style={{ cursor: "pointer" }}
                        >
                          {p.title}
                        </button>
                      </h5>
                      <div className="ai-prompt-card-desc-row d-flex align-items-start gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => openPrompt(p)}
                          className="ai-prompt-card__desc-btn text-body-1 text-start flex-grow-1 min-w-0 border-0 bg-transparent p-0"
                          style={{ cursor: "pointer", color: "inherit" }}
                        >
                          <span className="ai-prompt-card__desc-preview">
                            {descriptionPlain(p.description)}
                          </span>
                        </button>
                        <button
                          type="button"
                          className="ai-prompt-card-copy btn flex-shrink-0"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            void copyPlainDescription(p.description, p._id);
                          }}
                          aria-label={`Copy description: ${p.title}`}
                          title={
                            copiedKey === p._id ? "Copied!" : "Copy description"
                          }
                        >
                          {copiedKey === p._id ? (
                            <i
                              className="bi bi-check2 text-success"
                              aria-hidden
                            />
                          ) : (
                            <i className="bi bi-clipboard" aria-hidden />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {selected && (
        <div
          className="modal fade show d-block ai-prompt-modal-backdrop"
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="ai-prompt-modal-title"
          onClick={closeModal}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable ai-prompt-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content ai-prompt-modal__panel shadow-lg">
              <div className="modal-header ai-prompt-modal__header border-0 pb-0">
                <div className="d-flex flex-column gap-2 me-2 min-w-0 flex-grow-1">
                  <span className="ai-prompt-modal__badge text-uppercase">
                    {categoryLabel(selected.category)}
                  </span>
                  <h5
                    className="modal-title mb-0 text-break"
                    id="ai-prompt-modal-title"
                  >
                    {selected.title}
                  </h5>
                </div>
                <button
                  type="button"
                  className="btn-close ai-prompt-modal__close flex-shrink-0 mt-1"
                  aria-label="Close"
                  onClick={closeModal}
                />
              </div>
              <div className="modal-body ai-prompt-modal__body pt-3">
                <div className="ai-prompt-modal-thumb ai-prompt-modal-thumb--contain mb-3">
                  <Image
                    fill
                    src={selected.thumbnailUrl}
                    alt=""
                    sizes="(max-width: 991px) 100vw, 800px"
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className="ai-prompt-modal__desc-section">
                  <span className="ai-prompt-modal__desc-label text-uppercase d-block">
                    Description
                  </span>
                  <div className="ai-prompt-modal__desc-value-row d-flex align-items-start gap-2">
                    <div
                      className="ai-prompt-modal__richtext text-body-1 flex-grow-1 min-w-0 mb-0"
                      dangerouslySetInnerHTML={{
                        __html: (() => {
                          const h = normalizeQuillValue(selected.description);
                          return h.trim() ? h : "<p>No description yet.</p>";
                        })(),
                      }}
                    />
                    <button
                      type="button"
                      className="btn ai-prompt-modal__copy-btn d-inline-flex align-items-center gap-2 flex-shrink-0"
                      onClick={() =>
                        void copyPlainDescription(selected.description, "modal")
                      }
                      aria-label="Copy description"
                    >
                      {copiedKey === "modal" ? (
                        <i className="bi bi-check2" aria-hidden />
                      ) : (
                        <i className="bi bi-clipboard" aria-hidden />
                      )}
                      {copiedKey === "modal" ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
