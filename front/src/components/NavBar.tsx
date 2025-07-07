import {
  Close,
  Menu as MenuIcon,
  Person,
  ShoppingCart,
} from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
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
        <Typography
          variant="h6"
          className="text-xl sm:text-2xl font-bold text-blue-600 hover:text-blue-500 transition-colors"
        >
          CarPark
        </Typography>

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
          <IconButton>
            <Person />
          </IconButton>

          <IconButton
            onClick={() => setMobileOpen(true)}
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </div>
      </Toolbar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <div className="w-64 p-4 space-y-4">
          <div className="flex justify-end">
            <IconButton onClick={() => setMobileOpen(false)}>
              <Close />
            </IconButton>
          </div>
          <List className="space-y-2">
            <ListItemButton>Products</ListItemButton>
            <ListItemButton>Favorites</ListItemButton>
            <ListItemButton>Cart</ListItemButton>
          </List>
        </div>
      </Drawer>
    </AppBar>
  );
}
