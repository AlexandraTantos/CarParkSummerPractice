import "./App.css";
import Content from "./components/Content/Content";
import { FavoriteProvider } from "./contexts/FavoritesContext";
import { FiltersProvider } from "./contexts/FiltersContext";

function App() {
  return (
    <FiltersProvider>
      <FavoriteProvider>
        <Content />
      </FavoriteProvider>
    </FiltersProvider>
  );
}

export default App;
