import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { isPromoActive } from "./shared/promoActive";
import { useState } from "react";

export function Warranty() {
  const promo = isPromoActive();
  const [selectedWarranty, setSelectedWarranty] = useState(
    promo ? "promo" : "standard"
  );
  return (
    <Box sx={{ mt: 7 }}>
      <FormControl sx={{ mt: 2 }}>
        <FormLabel>Warranty Options</FormLabel>
        <RadioGroup
          value={selectedWarranty}
          onChange={(e) => setSelectedWarranty(e.target.value)}
        >
          <FormControlLabel
            value="standard"
            control={<Radio />}
            label="Standard Warranty (1 year) - Included"
          />

          {promo ? (
            <FormControlLabel
              value="promo"
              control={<Radio />}
              label="2 Years Extended Warranty - FREE (Promo)"
            />
          ) : (
            <>
              <FormControlLabel
                value="extended1"
                control={<Radio />}
                label="Extended Warranty (2 years) - 499 €"
              />
            </>
          )}
          <FormControlLabel
            value="extended2"
            control={<Radio />}
            label="Extended Warranty (3 years) - 899 €"
          />
          <FormControlLabel
            value="premium"
            control={<Radio />}
            label="Premium Warranty (3 years + roadside help) - 1099 €"
          />
        </RadioGroup>
      </FormControl>

      <Paper elevation={2} sx={{ mt: 4, p: 2 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          Selected Plan:
        </Typography>
        <Typography>
          {(() => {
            switch (selectedWarranty) {
              case "extended1":
                return "Extended Warranty (2 years) - 499 €";
              case "extended2":
                return "Extended Warranty (3 years) - 899 €";
              case "premium":
                return "Premium (3 years + roadside help) - 1299 €";
              case "promo":
                return "2 Years Extended Warranty - FREE (Promo)";
              default:
                return "Standard Warranty (1 year) - Included";
            }
          })()}
        </Typography>
      </Paper>
    </Box>
  );
}
