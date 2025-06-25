import { useCarsList } from "../../hooks/useCarsList";
import { useFavorites } from "../../hooks/useFavorites";
import { useFilters } from "../../hooks/useFilters";
import CarItem from "../CarItem/CarItem";
import FiltersPanel from "../FiltersPanel/FiltersPanel";
import "./Content.css";

export default function Content() {
  const { carsList, isError, isLoading } = useCarsList();
  const { filters } = useFilters();
  const { favorites } = useFavorites();

  const filteredCarsList = carsList.filter((car) => {
    const filteredManufacturer =
      filters.manufacturer === "" ||
      car.manufacturer
        .toLowerCase()
        .includes(filters.manufacturer.toLowerCase());
    if (filters.showFavoritesOnly) {
      return (
        filteredManufacturer &&
        favorites.some((favorite) => favorite.vin === car.vin)
      );
    }

    return filteredManufacturer;
  });

  if (isLoading) {
    return <p>Data is loading...</p>;
  }
  if (isError) {
    return <p>Something went wrong</p>;
  }
  return (
    <div>
      <FiltersPanel />
      {filteredCarsList.map((car, index) => {
        return (
          <div key={index}>
            <CarItem car={car} />
          </div>
        );
      })}
    </div>
  );
}
