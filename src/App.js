import "./App.css";
import BottomNavBar from "./BottomNavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Rewards from "./pages/Rewards";
import './pages/pages.css';

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
