import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Signin";
import Navbar from "./components/Navbar";
import Register from "./pages/Signup";
import AuthProvider from "./context/AuthContext";
import PrivateRoute from "./router/PrivateRoute";
import Welcome from "./pages/Welcome";
import PublicRoute from "./router/PublicRoute";
import PageNotFound from "./pages/PageNotFound";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/welcome" element={<Welcome />} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Register />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
