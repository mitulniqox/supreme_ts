import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./ProductList";
import './App.css';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<ProductList />}
        />
      </Routes>
    </Router>
  );
};

export default App;
