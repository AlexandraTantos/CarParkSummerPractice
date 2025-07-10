import { createContext, ReactNode, useEffect, useState } from "react";
import { Car } from "../models";

type FavoritesContextType = {
  favorites: Car[];
  toggleFavorite: (car: Car) => void;
  isFavorite: (car: Car) => boolean;
};

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Car[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (car: Car) => {
    setFavorites((prev) => {
      const exists = prev.find((fav) => fav.vin === car.vin);
      if (exists) {
        return prev.filter((fav) => fav.vin !== car.vin);
      } else {
        return [...prev, car];
      }
    });
  };

  const isFavorite = (car: Car) => favorites.some((fav) => fav.vin === car.vin);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
