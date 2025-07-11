import { Car } from "../models";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Divider,
  Box,
  ListItem,
} from "@mui/material";

interface ItemDetailsDialogProps {
  car: Car;
  onClose: () => void;
}

export default function ItemDetailsDialog({
  car,
  onClose,
}: ItemDetailsDialogProps) {
  if (!car) return null;

  const equipments = car.equipment?.split(",") || [];

  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ mb: 0, pb: 0 }} color="primary">
        {car.manufacturer} {car.model} ({car.constructionYear})
      </DialogTitle>

      <Typography
        variant="body2"
        color="text.secondary"
        className="px-6"
        sx={{ mt: 0.5 }}
      >
        {car.power} • {car.mileage} • {car.gearbox}
      </Typography>

      <DialogContent dividers>
        <img
          src={`/img/${car.image}`}
          alt={`${car.manufacturer} ${car.model}`}
          className="object-cover place-self-center w-160 max-w-full h-90 p-4 rounded-3xl"
        />

        <Divider sx={{ my: 2 }} />
        <Box>
          <Typography variant="subtitle1">
            <strong>Equipments:</strong>
          </Typography>
          <Box className="grid grid-cols-3">
            {equipments.slice(0, 9).map((eq, index) => (
              <ListItem key={index}>• {eq.trim()}</ListItem>
            ))}
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1">
            <strong>Description:</strong> {car.description}
          </Typography>
          <Divider sx={{ my: 2 }} />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
