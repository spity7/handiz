"use client";

import { useFilterDropdown } from "@/components/modals/searchFilterDropdownContext";
import { memo, useMemo } from "react";

export type FilterGroupKind = "categories" | "concepts" | "types";

const OTHERS_VALUE = "Others";

type FilterGroupProps = {
  groupId: string;
  groupKind: FilterGroupKind;
  title: string;
  titleId: string;
  items: string[];
  selected: string[];
  onToggle: (value: string) => void;
};

export function sortItemsForDisplay(items: string[]): string[] {
  const sorted = [...items];
  const othersIndex = sorted.indexOf(OTHERS_VALUE);
  if (othersIndex !== -1) {
    sorted.splice(othersIndex, 1);
    sorted.push(OTHERS_VALUE);
  }
  return sorted;
}

function capitalizeSegments(label: string): string {
  return label
    .split(/\s*\/\s*/)
    .map((seg) => {
      const trimmed = seg.trim();
      if (!trimmed) return trimmed;
      return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
    })
    .join(" / ");
}

export function displayLabel(
  groupKind: FilterGroupKind,
  rawValue: string,
): string {
  let label = rawValue;
  if (groupKind === "categories") {
    label = label.replace(/\s+Project$/i, "");
  }
  return capitalizeSegments(label);
}

function buildTriggerLabel(
  title: string,
  groupKind: FilterGroupKind,
  selected: string[],
): string {
  if (selected.length === 0) {
    return `All ${title.toLowerCase()}`;
  }
  if (selected.length === 1) {
    return displayLabel(groupKind, selected[0]);
  }
  return `${selected.length} selected`;
}

function FilterGroup({
  groupId,
  groupKind,
  title,
  titleId,
  items,
  selected,
  onToggle,
}: FilterGroupProps) {
  const { open, setOpen } = useFilterDropdown(groupId);
  const triggerId = `${titleId}-trigger`;
  const menuId = `${titleId}-menu`;

  const sortedItems = useMemo(() => sortItemsForDisplay(items), [items]);
  const selectedSet = useMemo(() => new Set(selected), [selected]);
  const selectedCount = selected.length;
  const triggerLabel = useMemo(
    () => buildTriggerLabel(title, groupKind, selected),
    [title, groupKind, selected],
  );

  const optionRows = useMemo(
    () =>
      sortedItems.map((value, index) => ({
        value,
        index,
        label: displayLabel(groupKind, value),
      })),
    [sortedItems, groupKind],
  );

  return (
    <div className="filter-group" role="group" aria-labelledby={titleId}>
      <label className="filter-group__title" id={titleId} htmlFor={triggerId}>
        {title}
      </label>

      <div
        className={`filter-dropdown${open ? " is-open" : ""}${selectedCount > 0 ? " has-selection" : ""}`}
      >
        <button
          id={triggerId}
          type="button"
          className="filter-dropdown__trigger"
          aria-expanded={open}
          aria-haspopup="true"
          aria-controls={menuId}
          onClick={() => setOpen(!open)}
        >
          <span
            className={`filter-dropdown__trigger-label${selectedCount === 0 ? " is-placeholder" : ""}`}
          >
            {triggerLabel}
          </span>
          <span className="filter-dropdown__trigger-end">
            {selectedCount > 0 ? (
              <span className="filter-dropdown__badge" aria-hidden>
                {selectedCount}
              </span>
            ) : null}
            <i
              className="bi bi-chevron-down filter-dropdown__chevron"
              aria-hidden
            />
          </span>
        </button>

        {open ? (
          <div
            id={menuId}
            className="filter-dropdown__menu"
            role="group"
            aria-labelledby={titleId}
          >
            <ul className="filter-dropdown__list">
              {optionRows.map(({ value, index, label }) => {
                const optionId = `${menuId}-opt-${index}`;
                const isSelected = selectedSet.has(value);
                return (
                  <li key={value} className="filter-dropdown__item">
                    <label
                      className="filter-dropdown__option"
                      htmlFor={optionId}
                    >
                      <input
                        id={optionId}
                        type="checkbox"
                        className="filter-dropdown__checkbox"
                        checked={isSelected}
                        onChange={() => onToggle(value)}
                      />
                      <span className="filter-dropdown__option-text">
                        {label}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default memo(FilterGroup);
