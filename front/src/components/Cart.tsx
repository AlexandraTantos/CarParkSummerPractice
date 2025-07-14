import { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Card,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import NavBar from "./NavBar";
import { useCart } from "../hooks/useCart";
import parsePrice from "./shared/parsePrice";
import { Warranty } from "./Warranty";
import { AccountDetails } from "./AccountDetails";
import { OrderDetails } from "./OrderDetails";

function formatPrice(num: number) {
  if (num % 1 === 0) {
    return num.toString();
  } else {
    return num.toFixed(2).replace(".", ",");
  }
}

export default function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [activeStep, setActiveStep] = useState(0);

  const steps = ["Shopping Cart", "Warranty", "Account", "Order Details"];

  const totalPrice = cartItems.reduce((sum, item) => {
    const parsedPrice = parsePrice(item.price);
    return sum + parsedPrice * item.quantity;
  }, 0);

  return (
    <div>
      <NavBar />
      <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <>
            {cartItems.length === 0 ? (
              <Typography
                variant="h6"
                align="center"
                sx={{ mt: 8, color: "gray" }}
              >
                Cart is empty
              </Typography>
            ) : (
              <Box sx={{ mt: 4 }}>
                {cartItems.map((item) => (
                  <Card
                    key={item.vin}
                    className="flex flex-col sm:flex-row gap-4 p-4 mb-3 items-center"
                  >
                    <img
                      src={`/img/${item.image}`}
                      alt={item.model}
                      className="h-50 object-cover rounded-lg flex-grow-[2] min-w-[200px] max-w-[320px]"
                    />
                    <Box className="flex-grow">
                      <Typography variant="subtitle1" fontWeight={600}>
                        {item.manufacturer} {item.model} (
                        {item.constructionYear})
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.power} • {item.gearbox}
                      </Typography>
                      <Typography variant="body2" mt={1}>
                        Price: <strong>{item.price} €</strong> x {item.quantity}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="primary"
                        fontWeight={600}
                        mt={1}
                      >
                        Total: Total:{" "}
                        {formatPrice(parsePrice(item.price) * item.quantity)} €{" "}
                      </Typography>
                    </Box>
                    <IconButton
                      onClick={() => removeFromCart(item.vin)}
                      aria-label="remove"
                      color="error"
                      className="flex "
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Card>
                ))}

                <Divider />

                <Box sx={{ textAlign: "right", mt: 4 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Grand Total:{" "}
                    <Box
                      component="span"
                      sx={{ color: "blue", fontWeight: "bold" }}
                    >
                      {formatPrice(totalPrice)} €
                    </Box>
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={clearCart}
                    sx={{ mt: 1, textTransform: "none" }}
                  >
                    Clear Cart
                  </Button>
                </Box>
              </Box>
            )}
          </>
        )}

        {activeStep === 1 && <Warranty />}
        {activeStep === 2 && <AccountDetails />}
        {activeStep === 3 && <OrderDetails />}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={() => setActiveStep((prev) => prev - 1)}
          >
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                alert("Order placed successfully!");
              }}
            >
              Place Order
            </Button>
          ) : (
            <Button onClick={() => setActiveStep((prev) => prev + 1)}>
              Next
            </Button>
          )}
        </Box>
      </Box>
    </div>
  );
}
