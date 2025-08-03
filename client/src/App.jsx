import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SearchTrips from "./pages/SearchTrips";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import PassengerDetail from "./pages/PassengerDetail";
import PostTrip from "./pages/PostTrip";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // Manage logged in state here
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("token"));

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/SearchTrips" element={<SearchTrips />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/passenger-detail/:id" element={<PassengerDetail />} />

        <Route
          path="/post-trip"
          element={
            <PrivateRoute>
              <PostTrip />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-center" />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
