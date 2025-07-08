import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useCarsList } from "../hooks/useCarsList";
import { useFilters } from "../hooks/useFilters";

export default function FiltersPanel() {
  const [openYear, setOpenYear] = useState(true);
  const [openPrice, setOpenPrice] = useState(true);
  const [openMileage, setOpenMileage] = useState(true);
  const [openFuelType, setOpenFuelType] = useState(true);
  const { filters, updateFilter, resetFilters } = useFilters();

  const { getManufacturers } = useCarsList();
  const fuelOptions = ["Electric", "Petrol", "Diesel"];
  const handleChange = (event: SelectChangeEvent<string | string[]>) => {
    const {
      target: { value },
    } = event;
    updateFilter("manufacturers", typeof value === "string" ? [value] : value);
  };
  const handleFuelChange = (fuel: string) => {
    let newFuelTypes = [...filters.fuelTypes];
    if (newFuelTypes.includes(fuel)) {
      newFuelTypes = newFuelTypes.filter((f) => f !== fuel);
    } else {
      newFuelTypes.push(fuel);
    }
    updateFilter("fuelTypes", newFuelTypes);
  };
  return (
    <Box className="px-6 py-2 bg-white rounded-lg shadow-md max-w-md mx-auto space-y-4 sticky">
      <Typography variant="h6" gutterBottom className="font-bold text-gray-800">
        Filters
      </Typography>
      <Box className="flex items-center justify-between mb-0 mt-6">
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.showFavoritesOnly}
              onChange={(e) =>
                updateFilter("showFavoritesOnly", e.target.checked)
              }
              color="primary"
            />
          }
          label="Show Favorites"
        />
      </Box>

      <Box className="mb-4">
        <Typography
          variant="subtitle1"
          className="font-semibold text-gray-800 py-4 text-left "
        >
          Manufacturer
        </Typography>

        <FormControl className="w-full" size="small">
          <InputLabel id="manufacturer-select-label">Name</InputLabel>
          <Select
            labelId="manufacturer-select-label"
            id="manufacturer-select"
            multiple
            value={filters.manufacturers}
            onChange={handleChange}
            input={<OutlinedInput label="Name" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {getManufacturers().map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box className="mb-4">
        <Box
          onClick={() => setOpenYear((prev) => !prev)}
          className="flex items-center justify-between cursor-pointer py-1"
        >
          <Typography variant="subtitle1" className="font-semibold">
            Construction Year
          </Typography>
          <IconButton
            size="small"
            sx={{
              transform: openYear ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s",
            }}
            aria-expanded={openYear}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>
        <Collapse in={openYear}>
          <Box className="flex space-x-2 mt-2 justify-between">
            <TextField
              label="Min"
              type="number"
              value={filters.constructionYearMin || ""}
              onChange={(e) =>
                updateFilter(
                  "constructionYearMin",
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              variant="outlined"
              size="small"
              className="w-28"
              inputProps={{ min: 0 }}
              error={Number(filters.constructionYearMin) < 0}
            />
            <Typography className="self-center">to</Typography>
            <TextField
              label="Max"
              type="number"
              value={filters.constructionYearMax || ""}
              onChange={(e) =>
                updateFilter(
                  "constructionYearMax",
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              variant="outlined"
              size="small"
              className="w-28"
              inputProps={{ min: 0 }}
              error={Number(filters.constructionYearMax) < 0}
            />
          </Box>
        </Collapse>
      </Box>

      <Box className="mb-4">
        <Box
          onClick={() => setOpenPrice((prev) => !prev)}
          className="flex items-center justify-between cursor-pointer py-1"
        >
          <Typography variant="subtitle1" className="font-semibold">
            Price (EUR)
          </Typography>
          <IconButton
            size="small"
            sx={{
              transform: openPrice ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s",
            }}
            aria-expanded={openPrice}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>
        <Collapse in={openPrice}>
          <Box className="flex space-x-2 mt-2 justify-between ">
            <TextField
              label="Min"
              type="number"
              value={filters.priceMin || ""}
              onChange={(e) =>
                updateFilter(
                  "priceMin",
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              variant="outlined"
              size="small"
              className="w-28"
              inputProps={{ min: 0 }}
              error={Number(filters.priceMin) < 0}
            />
            <Typography className="self-center">to</Typography>
            <TextField
              label="Max"
              type="number"
              value={filters.priceMax || ""}
              onChange={(e) =>
                updateFilter(
                  "priceMax",
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              variant="outlined"
              size="small"
              className="w-28"
              inputProps={{ min: 0 }}
              error={Number(filters.priceMax) < 0}
            />
          </Box>
        </Collapse>
      </Box>

      <Box className="mb-4">
        <Box
          onClick={() => setOpenMileage((prev) => !prev)}
          className="flex items-center justify-between cursor-pointer py-1"
        >
          <Typography variant="subtitle1" className="font-semibold">
            Mileage
          </Typography>
          <IconButton
            size="small"
            sx={{
              transform: openMileage ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s",
            }}
            aria-expanded={openMileage}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>
        <Collapse in={openMileage}>
          <Box className="flex space-x-2 mt-2 justify-between ">
            <TextField
              label="Min"
              type="number"
              value={filters.mileageMin || ""}
              onChange={(e) =>
                updateFilter(
                  "mileageMin",
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              variant="outlined"
              size="small"
              className="w-28"
              inputProps={{ min: 0 }}
              error={Number(filters.mileageMin) < 0}
              helperText={
                Number(filters.mileageMin) < 0 ? "Must be 0 or more" : ""
              }
            />

            <Typography className="self-center">to</Typography>
            <TextField
              label="Max"
              type="number"
              value={filters.mileageMax || ""}
              onChange={(e) =>
                updateFilter(
                  "mileageMax",
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              variant="outlined"
              size="small"
              className="w-28"
              inputProps={{ min: 0 }}
              error={Number(filters.mileageMin) < 0}
              helperText={
                Number(filters.mileageMin) < 0 ? "Must be 0 or more" : ""
              }
            />
          </Box>
        </Collapse>
      </Box>
      <Box className="mb-4">
        <Box
          onClick={() => setOpenFuelType((prev) => !prev)}
          className="flex items-center justify-between cursor-pointer py-1"
        >
          <Typography variant="subtitle1" className="font-semibold">
            Fuel Type
          </Typography>
          <IconButton
            size="small"
            sx={{
              transform: openFuelType ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s",
            }}
            aria-expanded={openFuelType}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>
        <Collapse in={openFuelType}>
          <FormGroup className="pl-2 justify-items-center">
            {fuelOptions.map((fuel) => (
              <FormControlLabel
                key={fuel}
                control={
                  <Checkbox
                    checked={filters.fuelTypes.includes(fuel)}
                    onChange={() => handleFuelChange(fuel)}
                  />
                }
                label={<span className="block text-center w-full">{fuel}</span>}
              />
            ))}
          </FormGroup>
        </Collapse>
      </Box>

      <Button
        variant="outlined"
        color="primary"
        onClick={resetFilters}
        fullWidth
      >
        Reset filters
      </Button>
    </Box>
  );
}
