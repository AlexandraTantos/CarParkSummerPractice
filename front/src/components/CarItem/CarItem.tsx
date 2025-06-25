import { useState } from "react";
import { Car } from "../../models";
import "./CarItem.css";
import { useFavorites } from "../../hooks/useFavorites";

type Props = {
  car: Car;
};

export default function CarItem({ car }: Props) {
  const equipments = car.equipment.split(",");

  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className="carItem">
      <div className="imageContainer">
        <img
          src={`http://localhost:3019/img/${car.image}`}
          className="carImage"
        />
      </div>
      <div className="details">
        <div className="row">
          <div className="label">Manufacturer: </div> {car.manufacturer}
        </div>
        <div className="row">
          <div className="label">Model: </div>
          {car.model}
        </div>
        <div className="row">
          <div className="label">Construction Year: </div>
          {car.constructionYear}
        </div>
        <div className="row">
          <div className="label">Fuel type: </div>
          {car.fuelType}
        </div>
        <div className="row">
          <div className="label">Engine size: </div>
          {car.engineSize}
        </div>

        <div className="row">
          <div className="label">Equipments:</div>
        </div>
        <div className="row">
          <ul className="list">
            {equipments.slice(0, 9).map((equipment, index) => {
              return <li key={index}>{equipment}</li>;
            })}
          </ul>
        </div>
      </div>
      <div className="price">Price: {car.price} EUR</div>
      <div className="row">
        <button className="button" onClick={() => toggleFavorite(car)}>
          {isFavorite(car) ? "Remove from favorites" : "Add to favorites"}
        </button>
      </div>
    </div>
  );
}
