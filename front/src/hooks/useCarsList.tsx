import { useEffect, useState } from "react";
import { Car } from "../models";

export function useCarsList() {
  const [carsList, setCarsList] = useState<Car[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function getCarList() {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3019/car");
      if (res.ok) {
        const data = await res.json();
        setCarsList(data);
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCarList();
  }, []);

  function getManufacturers(): string[] {
    const manufacturersSet = new Set(carsList.map((car) => car.manufacturer));
    return Array.from(manufacturersSet).sort();
  }

  return { carsList, isError, isLoading, getManufacturers };
}
