import { Car } from "../../models";
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
  CardMedia,
} from "@mui/material";
import Grid from "@mui/material/Grid";

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
      <DialogTitle>
        {car.manufacturer} {car.model} ({car.constructionYear})
      </DialogTitle>

      <DialogContent dividers>
        <img
          src={`http://localhost:3019/img/${car.image}`}
          alt={`${car.manufacturer} ${car.model}`}
          className="object-cover place-self-center w-160 max-w-full h-90 p-4 rounded-3xl"
        />
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
