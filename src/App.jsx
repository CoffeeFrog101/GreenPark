import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNavBar from "./pages/BottomNavBar";
import Home from "./pages/home/Home";
import Profile from "./pages/Profile";
import Rewards from "./pages/rewards/Rewards";
import "./pages/pages.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <BottomNavBar />
    </BrowserRouter>
  );
}

export default App;
