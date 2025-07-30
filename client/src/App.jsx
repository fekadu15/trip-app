import { BrowserRouter , Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SearchTrips from "./pages/SearchTrips"
import NotFound from "./pages/NotFound";
import About from "./pages/About";
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
      </Routes>
<Footer />
    </BrowserRouter>
  );
}
export default App;
