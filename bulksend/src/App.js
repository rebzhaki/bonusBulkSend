import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePages from "./pages/homePage";
import CheckBalance from "./pages/checkBalancePage";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePages />} /> 
      <Route path="/transferFunds" element={<CheckBalance />} /> 
      </Routes>
    </Router>
  )
}

export default App;
