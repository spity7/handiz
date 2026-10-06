"use client";

import {
  createContext,
  useCallback,
  useContext,
  type ReactNode,
} from "react";

type FilterDropdownContextValue = {
  openGroupId: string | null;
  setOpenGroupId: (id: string | null) => void;
};

const FilterDropdownContext = createContext<FilterDropdownContextValue | null>(
  null,
);

export function SearchFilterDropdownProvider({
  value,
  children,
}: {
  value: FilterDropdownContextValue;
  children: ReactNode;
}) {
  return (
    <FilterDropdownContext.Provider value={value}>
      {children}
    </FilterDropdownContext.Provider>
  );
}

export function useFilterDropdown(groupId: string) {
  const ctx = useContext(FilterDropdownContext);
  if (!ctx) {
    throw new Error("useFilterDropdown must be used within SearchModalFilters");
  }

  const open = ctx.openGroupId === groupId;
  const setOpen = useCallback(
    (next: boolean) => {
      ctx.setOpenGroupId(next ? groupId : null);
    },
    [ctx, groupId],
  );

  return { open, setOpen };
}
