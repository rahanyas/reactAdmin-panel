/* eslint-disable react/prop-types */
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { Fragment, Suspense } from "react";
import { UserProvider } from "./context/UserContext";
import Login from "./Pages/userUi/Login";
import Home from "./Pages/userUI/Home";
import HomeRedirect from "./utils/HomeRedirect";
import useUser from "./context/UserContext";
import Cart from "./Pages/userUI/Cart";

import AdminLogin from "./Pages/adminUI/LoginAdmin";
import { AdminProvider } from "./context/AdminContext";
import useAdmin from "./context/AdminContext";
import Dashboard from "./Pages/adminUI/Dashboard";

const SignIn = React.lazy(() => import('./Pages/userUi/SignIn'));



function ProtectedRoute({ children }) {
  const { user } = useUser();
  return user ? children : <Navigate to="/login" />;
}

function AdminProtectedRoute({children}) {
  const {admin} = useAdmin();
  return admin ? children : <Navigate to='/admin/adminLogin' />
}

function AdminRoutes(){
  return (
   
      <Routes>
        <Route path="/adminLogin" element={<AdminLogin/>}/>
        <Route path="/dashboard" element={<AdminProtectedRoute><Dashboard/></AdminProtectedRoute>}/>
      </Routes>
    
  )
}

function App() {


  return (
    <Fragment>
      <BrowserRouter>
        <UserProvider>
          <AdminProvider>
          <Suspense fallback={<h1>Loading...</h1>}>
            <Routes>
              <Route path="/" element={<HomeRedirect />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signin" element={<SignIn />} />

              <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />

              <Route path="/admin/*" element={<AdminRoutes/>} />
                                    
            </Routes>
          </Suspense>
          </AdminProvider>
        </UserProvider>
      </BrowserRouter>
    </Fragment>
  );
}


export default App;
