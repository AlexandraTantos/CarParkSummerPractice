import { useCarsList } from "../../hooks/useCarsList";
import { useFavorites } from "../../hooks/useFavorites";
import { useFilters } from "../../hooks/useFilters";
import CarItem from "../CarItem/CarItem";
import FiltersPanel from "../FiltersPanel/FiltersPanel";
import "./Content.css";
import NavBar from "../NavigationBar/NavBar";
import SearchInput from "../SearchInput/SearchInput";
import { useState } from "react";

export default function Content() {
  const { carsList, isError, isLoading } = useCarsList();
  const [searchQuery, setSearchQuery] = useState("");
  const { filters } = useFilters();
  const { favorites } = useFavorites();

  function parsePrice(value: string | number): number {
    if (typeof value === "number") return value;
    return Number(value.replace(/\./g, "").replace(/\s/g, ""));
  }

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
    return true;
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
      <NavBar />
      <div className="flex min-h-screen">
        <aside className="hidden sm:block w-88 p-4 bg-gray-50 border-r border-gray-200">
          <FiltersPanel />
        </aside>
        <div className="w-full">
          <SearchInput onSearch={setSearchQuery} />
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
