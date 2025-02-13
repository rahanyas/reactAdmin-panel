/* eslint-disable react/prop-types */
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Fragment } from "react";
import { UserProvider } from "./context/UserContext";
import Login from "./Pages/Login";
import SignIn from "./Pages/SignIn";
import Home from "./Pages/Home";
import HomeRedirect from "./utils/HomeRedirect";
import useUser from "./context/UserContext";

import "./App.css";

function ProtectedRoute({ children }) {
  const { user } = useUser();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Fragment>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            {/* Redirect logic for "/" */}
            <Route path="/" element={<HomeRedirect />} />

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<SignIn />} />

            {/* Protected Route: Home (Only if logged in) */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </Fragment>
  );
}

export default App;
