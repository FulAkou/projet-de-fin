import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import OfferForm from "./components/OfferForm";
import APropos from "./pages/APropos";
import CommentCaMarche from "./pages/CommentCaMarche";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyOffers from "./pages/MyOffers";
import MyReservations from "./pages/MyReservations";
import OfferDetails from "./pages/OfferDetails";
import Offers from "./pages/Offers";
import Register from "./pages/Register";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/offres" element={<Offers />} />
          <Route path="/creer-offre" element={<OfferForm />} />
          <Route path="/offres/:id" element={<OfferDetails />} />
          <Route path="/mes-offres" element={<MyOffers />} />
          <Route path="/mes-offres/nouvelle" element={<OfferForm />} />
          <Route path="/mes-offres/modifier/:id" element={<OfferForm />} />
          <Route path="/mes-reservations" element={<MyReservations />} />
          <Route path="/comment-ca-marche" element={<CommentCaMarche />} />
          <Route path="/a-propos" element={<APropos />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
