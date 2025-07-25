import { useCarsList } from "../hooks/useCarsList";
import { useFavorites } from "../hooks/useFavorites";
import { useFilters } from "../hooks/useFilters";
import CarItem from "./CarItem";
import FiltersPanel from "./FiltersPanel";
import NavBar from "./NavBar";
import SearchInput from "./SearchInput";
import { useState } from "react";
import SortDropdown from "./SortDropdown";
import parsePrice from "./shared/parsePrice";
import { PromoBanner } from "./PromoBanner";
import { isPromoActive } from "./shared/promoActive";

export default function Content() {
  const { carsList, isError, isLoading } = useCarsList();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("price-asc");

  const { filters } = useFilters();
  const { favorites } = useFavorites();

  function parseMileage(value: string | number): number {
    if (typeof value === "number") return value;
    return Number(value.replace(/\./g, "").replace(/\s*km/i, "").trim());
  }

  let filteredCars = carsList.filter((car) => {
    if (
      filters.constructionYearMin !== "" &&
      Number(car.constructionYear) < Number(filters.constructionYearMin)
    ) {
      return false;
    }

    if (
      filters.constructionYearMax !== "" &&
      Number(car.constructionYear) > Number(filters.constructionYearMax)
    ) {
      return false;
    }

    const carPrice = parsePrice(car.price);
    if (filters.priceMin !== "" && carPrice < Number(filters.priceMin)) {
      return false;
    }

    if (filters.priceMax !== "" && carPrice > Number(filters.priceMax)) {
      return false;
    }

    const carMileage = parseMileage(car.mileage);
    if (filters.mileageMin !== "" && carMileage < Number(filters.mileageMin)) {
      return false;
    }

    if (filters.mileageMax !== "" && carMileage > Number(filters.mileageMax)) {
      return false;
    }

    if (
      filters.manufacturers.length !== 0 &&
      !filters.manufacturers.includes(car.manufacturer)
    ) {
      return false;
    }
    if (
      filters.fuelTypes.length > 0 &&
      !filters.fuelTypes.includes(car.fuelType)
    ) {
      return false;
    }
    if (filters.showFavoritesOnly) {
      return favorites.some((favorite) => favorite.vin === car.vin);
    }

    return true;
  });

  filteredCars = filteredCars.sort((a, b) => {
    const priceA = parsePrice(a.price);
    const priceB = parsePrice(b.price);
    const yearA = Number(a.constructionYear);
    const yearB = Number(b.constructionYear);

    switch (sortOption) {
      case "price-asc":
        return priceA - priceB;
      case "price-desc":
        return priceB - priceA;
      case "year-asc":
        return yearA - yearB;
      case "year-desc":
        return yearB - yearA;
      default:
        return 0;
    }
  });

  if (searchQuery !== "") {
    const searchWords = searchQuery.toLowerCase().split(" ").filter(Boolean);

    filteredCars = filteredCars.filter((car) => {
      const text = `${car.manufacturer} ${car.model}`.toLowerCase();
      return searchWords.every((word) => text.includes(word));
    });
  }

  if (isLoading) {
    return <p>Data is loading...</p>;
  }
  if (isError) {
    return <p>Something went wrong</p>;
  }
  return (
    <div>
      {isPromoActive() && <PromoBanner />}

      <NavBar />

      <div className="flex flex-col sm:flex-col md:flex-row min-h-screen">
        <aside className="hidden sm:block md:sticky sm:top-0 w-full sm:w-110 p-4 bg-gray-50 border-r border-gray-200 h-auto sm:h-screen overflow-auto">
          <FiltersPanel />
        </aside>
        <div className="w-full">
          <div className="flex flex-col sm:flex-row justify-between gap-6 ">
            <SearchInput onSearch={setSearchQuery} />
            <SortDropdown onSortChange={setSortOption} />
          </div>

          <main className=" p-6 bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.length === 0 ? (
              <div className="text-center text-gray-500 text-xl mt-10">
                No cars match the selected filters.
              </div>
            ) : (
              filteredCars.map((car, index) => (
                <div key={index}>
                  <CarItem car={car} />
                </div>
              ))
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
