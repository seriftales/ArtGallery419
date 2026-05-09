import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WorkshopDetail from "./pages/WorkshopDetail";
import Workshops from "./pages/Workshops";
import Checkout from "./pages/Checkout";
import Destek from "./pages/Destek";
import Adminpanel from "./pages/Adminpanel";
import EserDetay from "./pages/EserDetay";
import Favorilerim from "./pages/Favorilerim";
import Galeri from "./pages/Galeri";
import Settings from "./pages/Settings";
import Siparis from "./pages/Siparis";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/workshop" element={<WorkshopDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/destek" element={<Destek />} />
        <Route path="/adminpanel" element={<Adminpanel />} />
        <Route path="/eser-detay" element={<EserDetay />} />
        <Route path="/favorilerim" element={<Favorilerim />} />
        <Route path="/galeri" element={<Galeri />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/siparis" element={<Siparis />} />
      </Routes>
    </BrowserRouter>
  );
}