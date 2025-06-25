import { createContext, ReactNode, useState } from "react";
export type Filters = {
  manufacturer: string;
  showFavoritesOnly: boolean;
};

const defaultFilters: Filters = {
  manufacturer: "",
  showFavoritesOnly: false,
};

type FiltersContextType = {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  updateFilter: (field: keyof Filters, value: string) => void;
  resetFilters: () => void;
};

export const FiltersContext = createContext<FiltersContextType | undefined>(
  undefined
);

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState(defaultFilters);

  const updateFilter = (field: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const reset = () => setFilters(defaultFilters);
  return (
    <FiltersContext.Provider
      value={{ filters, setFilters, updateFilter, resetFilters: reset }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
