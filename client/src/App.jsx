import { BrowserRouter , Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SearchTrips from "./pages/SearchTrips"
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import PassengerDetail from "./pages/PassengerDetail";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SearchTrips" element = { <SearchTrips />} />
         <Route path="/aboutus" element = { <About />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/passenger-detail/:id" element={<PassengerDetail />} />
        
      </Routes>
      <ToastContainer position="top-center" />
<Footer />
    </BrowserRouter>
  );
}
export default App;
