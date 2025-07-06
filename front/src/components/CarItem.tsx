import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ItemDetailsDialog from "./ItemDetailsDialog";
import { Car } from "../models";
import { useFavorites } from "../hooks/useFavorites";

type Props = {
  car: Car;
};

export default function CarItem({ car }: Props) {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
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
        <Box>
          <IconButton onClick={() => toggleFavorite(car)} color="error">
            {isFavorite(car) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>

          <Button
            variant="contained"
            color="primary"
            size="small"
            className="capitalize"
            onClick={() => setSelectedCar(car)}
          >
            Read More
          </Button>
          {selectedCar && (
            <ItemDetailsDialog
              car={selectedCar}
              onClose={() => setSelectedCar(null)}
            />
          )}
        </Box>
      </CardActions>
    </Card>
  );
}
