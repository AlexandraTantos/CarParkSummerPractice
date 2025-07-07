import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { useFavorites } from "../hooks/useFavorites";
import { Car } from "../models";
import ItemDetailsDialog from "./ItemDetailsDialog";

type Props = {
  car: Car;
};

export default function CarItem({ car }: Props) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const { addToCart } = useCart();

  return (
    <Card className="w-full shadow-lg rounded-full overflow-hidden  transition-shadow duration-300">
      <Box className="relative w-full">
        <img
          src={`http://localhost:3019/img/${car.image}`}
          alt={`${car.manufacturer} ${car.model}`}
          className="object-cover w-full h-72 rounded-t-3xl"
        />

        <IconButton
          onClick={() => toggleFavorite(car)}
          color="error"
          className="!absolute top-2 right-2 z-20"
          sx={{
            backgroundColor: "white",
            "&:hover": {
              bgcolor: "white",
            },
          }}
        >
          {isFavorite(car) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>

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
        <Typography variant="subtitle1" className="font-bold text-indigo-600 ">
          Price: {car.price} €
        </Typography>
      </CardContent>

      <CardActions className="flex flex-col lg:flex-row bg-gray-50 mb-2 px-4 py-2 w-full gap-2">
        <Button
          variant="contained"
          color="primary"
          size="small"
          className="capitalize flex-1 w-full"
          onClick={() => addToCart(car)}
        >
          Add To Cart
        </Button>

        <Button
          variant="contained"
          color="primary"
          size="small"
          className="capitalize flex-1 w-full"
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
      </CardActions>
    </Card>
  );
}
