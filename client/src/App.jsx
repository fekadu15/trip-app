import { BrowserRouter , Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SearchTrips from "./pages/SearchTrips"
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SearchTrips" element = { <SearchTrips />} />
      </Routes>
<Footer />
    </BrowserRouter>
  );
}
export default App;
