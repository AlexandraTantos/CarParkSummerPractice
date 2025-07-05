import { createContext, ReactNode, useState } from "react";

export type Filters = {
  manufacturer: string;
  showFavoritesOnly: boolean;
  constructionYearMin?: number | "";
  constructionYearMax?: number | "";
  priceMin?: number | "";
  priceMax?: number | "";
  mileageMin?: number | "";
  mileageMax?: number | "";
  manufacturers: string[];
  fuelTypes: string[];
};

const defaultFilters: Filters = {
  manufacturer: "",
  showFavoritesOnly: false,
  constructionYearMin: "",
  constructionYearMax: "",
  priceMin: 0,
  priceMax: "",
  mileageMin: 0,
  mileageMax: "",
  manufacturers: [],
  fuelTypes: [],
};

type FiltersContextType = {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  updateFilter: (
    field: keyof Filters,
    value: string | number | boolean | string[]
  ) => void;
  resetFilters: () => void;
};

export const FiltersContext = createContext<FiltersContextType | undefined>(
  undefined
);

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const updateFilter = (
    field: keyof Filters,
    value: string | number | boolean | string[]
  ) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetFilters = () => setFilters(defaultFilters);

  return (
    <FiltersContext.Provider
      value={{ filters, setFilters, updateFilter, resetFilters }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
