import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
type SortDropdownProps = {
  onSortChange: (value: string) => void;
};
export default function SortDropdown({ onSortChange }: SortDropdownProps) {
  return (
    <Box className="ml-4 flex items-center gap-3 justify-self-end sm:mr-8 w-full sm:w-[30%]">
      <Typography
        variant="subtitle1"
        className="hidden lg:block font-semibold text-gray-800  "
      >
        Sort By
      </Typography>

      <FormControl size="small">
        <Select
          onChange={(e) => onSortChange(e.target.value)}
          defaultValue="price-asc"
        >
          <MenuItem value="price-asc">Price: Low to High</MenuItem>
          <MenuItem value="price-desc">Price: High to Low</MenuItem>
          <MenuItem value="year-desc">Newest First</MenuItem>
          <MenuItem value="year-asc">Oldest First</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
