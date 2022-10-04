import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Continents, Validation } from "../pages";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Continents />} />
        <Route path="/validation" element={<Validation />} />
      </Routes>
    </Router>
  );
};
