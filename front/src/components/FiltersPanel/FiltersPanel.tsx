import { useFilters } from "../../hooks/useFilters";
import "./FiltersPanel.css";

export default function FiltersPanel() {
  const { filters, updateFilter, resetFilters } = useFilters();
  const handleFavoritesToggle = (checked: boolean) => {
    if (!checked) {
      resetFilters();
    } else {
      updateFilter("showFavoritesOnly", "true");
    }
  };

  return (
    <div className="filtersPanel">
      <h3>Filters Cars</h3>
      <input
        type="text"
        placeholder="Manufacturer"
        value={filters.manufacturer}
        onChange={(e) => updateFilter("manufacturer", e.target.value)}
      />
      <label className="checkbox">
        <input
          type="checkbox"
          checked={filters.showFavoritesOnly}
          onChange={(e) => handleFavoritesToggle(e.target.checked)}
        />
        Show only favorites
      </label>
      <button onClick={resetFilters}>Reset filters</button>
    </div>
  );
}
