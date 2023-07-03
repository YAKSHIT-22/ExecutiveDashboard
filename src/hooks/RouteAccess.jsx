import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function RouteAccess() {
  const [token, setToken] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  function verifier() {
    const verifer = prompt("Enter verification code");
    setToken(verifer);
  }
  useEffect(() => {
    if (location.pathname === "/") {
      verifier();
    }
  }, [location.pathname]);

  return token === process.env.REACT_APP_VERIFICATION_CODE ? (
    <Outlet />
  ) : (
    navigate("/404")
  );
}
