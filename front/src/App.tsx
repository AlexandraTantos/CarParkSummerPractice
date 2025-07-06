import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Content from "./components/Content/Content";
import { FavoriteProvider } from "./contexts/FavoritesContext";
import { FiltersProvider } from "./contexts/FiltersContext";
import Cart from "./components/Cart";
function App() {
  return (
    <BrowserRouter>
      <FiltersProvider>
        <FavoriteProvider>
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </FavoriteProvider>
      </FiltersProvider>
    </BrowserRouter>
  );
}

export default App;
