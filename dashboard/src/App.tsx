import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Accounts from "./pages/Accounts";
import Issues from "./pages/Issues";
import Shipments from "./pages/Shipments";
import './index.css';


const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<div>Homepagina</div>} />
            <Route path="/shipments" element={<Shipments />} />
            <Route path="/issues" element={<Issues />} />
            <Route path="/accounts" element={<Accounts />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
