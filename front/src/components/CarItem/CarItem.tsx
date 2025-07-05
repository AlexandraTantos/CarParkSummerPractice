import { useState } from "react";
import { Car } from "../../models";
import "./CarItem.css";
import { useFavorites } from "../../hooks/useFavorites";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

type Props = {
  car: Car;
};

export default function CarItem({ car }: Props) {
  return (
    <Card className="w-full shadow-lg rounded-full overflow-hidden  transition-shadow duration-300">
      <CardMedia
        component="img"
        image={`http://localhost:3019/img/${car.image}`}
        alt={`${car.manufacturer} ${car.model}`}
        className="object-cover w-full max-w-full h-70 p-4 rounded-3xl"
      />
      <CardContent className="bg-white text-left ">
        <Typography
          variant="h6"
          component="h2"
          className="font-semibold text-gray-900 mb-1 truncate"
        >
          {car.constructionYear} {car.manufacturer} {car.model}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="mb-3">
          {car.power} • {car.mileage} • {car.gearbox}
        </Typography>
      </CardContent>
      <CardActions className="bg-gray-50 mb-2 px-4 py-2 justify-between">
        <Typography variant="subtitle1" className="text-indigo-600 font-bold">
          Price: {car.price} €
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className="capitalize"
        >
          Read More
        </Button>
      </CardActions>
    </Card>
  );
}

//         <button className="button" onClick={() => toggleFavorite(car)}>
//           {isFavorite(car) ? "Remove from favorites" : "Add to favorites"}
//         </button>
