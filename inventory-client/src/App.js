import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import NavBar from "./components/NavBar";
import Logout from "./components/Logout";
import Inventory from "./pages/Inventory";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <Router>
      {isAuthenticated && <NavBar />}
      <Routes>
        <Route path="/" element={<LogIn onLogin={handleLogin} />} />
        <Route path="/Inventory/:user_id" element={<Inventory />} />
        <Route path="/Logout" element={<Logout onLogout={handleLogout} />} />
        <Route path="/login" element={<LogIn onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp onSignUp={handleLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;
