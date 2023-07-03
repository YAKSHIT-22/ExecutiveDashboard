import React from "react";
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from "./components/PrivateRoute";
import RouteAccess from "./hooks/RouteAccess";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Error from "./Pages/Error";
import SignUp from "./Pages/Signup";
import ForgetPassword from "./Pages/ForgetPassword";
import PublicRoute from "./hooks/PublicRoute";
function App() {
  return (
    <Routes>
      
        <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
      
      <Route path="/profile" element={<PrivateRoute />} >
     <Route path="/profile" element={<Profile />} />
    </Route>
    <Route path="*" element={<Error/>} />
    </Routes>
    
  );
}

export default App;
