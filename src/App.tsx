import "./App.css";
import { HomePage } from "./Components/HomePage/HomePage";
import {
  CarvingProvider,
  useCarvingContext,
} from "./providers/carvings.provider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductPage } from "./Components/ProductPage/ProductPage";
import { SignInPage } from "./Components/SignInPage/SignInPage";
import { AuthProvider } from "./providers/auth.provider";
import { Toaster } from "react-hot-toast";
import { CheckoutPage } from "./Components/CheckoutPage/Checkoutpage";
import { ConfirmationPage } from "./Components/ConfirmationPage/ConfirmationPage";
import { FavoritePage } from "./Components/FavoritePage/FavoritePage";
import { AddCarvingPage } from "./Components/AddCarvingPage/AddCarvingPage";
import { FavoriteProvider } from "./providers/favorites.provider";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <FavoriteProvider>
          <CarvingProvider>
            <Toaster />
            <Router>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/ProductPage" element={<ProductPage />} />
                <Route path="/SignInPage" element={<SignInPage />} />
                <Route path="/CheckoutPage" element={<CheckoutPage />} />
                <Route
                  path="/ConfirmationPage"
                  element={<ConfirmationPage />}
                />
                <Route path="/FavoritePage" element={<FavoritePage />} />
                <Route path="/addCarving" element={<AddCarvingPage />} />
              </Routes>
            </Router>
          </CarvingProvider>
        </FavoriteProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
