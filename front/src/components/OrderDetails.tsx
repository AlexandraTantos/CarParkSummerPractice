import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material";
import { useAccount } from "../hooks/useAccount";
import { useCart } from "../hooks/useCart";

export function OrderDetails() {
  const { cartItems } = useCart();
  const { data } = useAccount();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, p: 2 }}>
      {cartItems.map((item) => (
        <Card key={item.vin} sx={{ display: "flex", p: 2 }}>
          <CardMedia
            component="img"
            sx={{
              width: 260,
              height: 200,
              objectFit: "cover",
              borderRadius: 2,
            }}
            image={`/img/${item.image}`}
            alt={item.model}
          />
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h6">
              {item.manufacturer} {item.model} ({item.constructionYear})
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.power} • {item.gearbox}
            </Typography>
            <Typography variant="body2" mt={1}>
              Quantity: {item.quantity}
            </Typography>
            <Typography variant="body2">
              Price per unit: {item.price}
            </Typography>
          </CardContent>
        </Card>
      ))}

      <Divider />

      <Card sx={{ p: 3, textAlign: "left" }}>
        <Typography variant="h6" gutterBottom>
          Delivery Information
        </Typography>
        <Typography>
          {data.firstName} {data.lastName}
        </Typography>
        <Typography>{data.email}</Typography>
        <Typography>{data.phone}</Typography>
        <Typography>
          {data.address}, {data.city}, {data.country}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          <strong>Payment method:</strong> {data.paymentMethod}
        </Typography>
      </Card>
    </Box>
  );
}
