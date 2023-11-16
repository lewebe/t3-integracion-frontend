import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainFlights from "./views/MainFlights";
import Flight from "./views/Flight";

function AppRoutes() {
  return (
    <Router>
        <Routes>
            <Route exact path="/" element={<MainFlights />} />
            <Route exact path="/flight/:flightNumber" element={<Flight />} />
        </Routes>
    </Router>
  );
}

export default AppRoutes;