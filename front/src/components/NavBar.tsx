import { Close, Person, ShoppingCart, Tune } from "@mui/icons-material";
import { AppBar, Badge, Drawer, IconButton, Toolbar } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import FiltersPanel from "./FiltersPanel";

export default function NavBar() {
  const [filterOpen, setFilterOpen] = useState(false);

  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={2}
      className="bg-white mx-auto px-4 sm:px-6 lg:px-8 relative"
    >
      <Toolbar className="flex justify-between items-center px-4">
        <Link
          to="/"
          className="text-xl sm:text-2xl font-bold text-blue-600 hover:text-blue-500 transition-colors"
        >
          CarPark
        </Link>

        <div className="hidden md:flex space-x-6 items-center text-gray-700">
          <Link
            to="/"
            className="hover:text-blue-600 hover:bg-gray-200 rounded-2xl py-1 px-2 transition cursor-pointer"
          >
            Products
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          <IconButton>
            <Link to="/cart">
              <Badge badgeContent={totalItems} color="primary">
                <ShoppingCart />
              </Badge>
            </Link>
          </IconButton>

          <IconButton
            onClick={() => setFilterOpen(true)}
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <Tune />
          </IconButton>
        </div>
      </Toolbar>

      <Drawer
        anchor="right"
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
      >
        <div className="w-92 p-4 space-y-4">
          <div className="flex justify-end">
            <IconButton onClick={() => setFilterOpen(false)}>
              <Close />
            </IconButton>
          </div>
          <FiltersPanel />
        </div>
      </Drawer>
    </AppBar>
  );
}
