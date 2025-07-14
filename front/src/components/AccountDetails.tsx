import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useAccount } from "../hooks/useAccount";

export function AccountDetails() {
  const { data, updateData } = useAccount();

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  });

  const validateField = (field: string, value: string) => {
    let errorMsg = "";

    switch (field) {
      case "firstName":
      case "lastName":
      case "address":
      case "city":
      case "country":
        if (value.trim() === "") {
          errorMsg = "This field is required";
        }
        break;

      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errorMsg = "Invalid email address";
        }
        break;

      case "phone":
        if (!/^\d{7,15}$/.test(value)) {
          errorMsg = "Phone must contain only digits (7-15)";
        }
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleChange = (field: keyof typeof data, value: string) => {
    updateData({ [field]: value });
    validateField(field, value);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 6 }}>
      <TextField
        label="First Name"
        value={data.firstName}
        onChange={(e) => handleChange("firstName", e.target.value)}
        error={!!errors.firstName}
        helperText={errors.firstName}
      />
      <TextField
        label="Last Name"
        value={data.lastName}
        onChange={(e) => handleChange("lastName", e.target.value)}
        error={!!errors.lastName}
        helperText={errors.lastName}
      />
      <TextField
        label="Email"
        value={data.email}
        onChange={(e) => handleChange("email", e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        label="Phone"
        value={data.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
        error={!!errors.phone}
        helperText={errors.phone}
      />
      <TextField
        label="Address"
        value={data.address}
        onChange={(e) => handleChange("address", e.target.value)}
        error={!!errors.address}
        helperText={errors.address}
      />
      <TextField
        label="City"
        value={data.city}
        onChange={(e) => handleChange("city", e.target.value)}
        error={!!errors.city}
        helperText={errors.city}
      />
      <TextField
        label="Country"
        value={data.country}
        onChange={(e) => handleChange("country", e.target.value)}
        error={!!errors.country}
        helperText={errors.country}
      />
      <FormControl>
        <FormLabel sx={{ textAlign: "left" }}>Payment Method</FormLabel>
        <RadioGroup
          value={data.paymentMethod}
          onChange={(e) => updateData({ paymentMethod: e.target.value })}
        >
          <FormControlLabel
            value="Cash"
            control={<Radio />}
            label="Cash on Delivery"
          />
          <FormControlLabel
            value="Card"
            control={<Radio />}
            label="Credit/Debit Card"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
