import React, { useEffect, useState } from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [userRole, setUserRole] = useState(null);
  const [tokenExists, setTokenExists] = useState(false);
  const navigate = useNavigate();

  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserRole(payload.role);
        setTokenExists(true);
      } catch {
        setUserRole(null);
        setTokenExists(false);
      }
    } else {
      setUserRole(null);
      setTokenExists(false);
    }
  };

  useEffect(() => {
    checkToken(); // On first load
    const interval = setInterval(checkToken, 1000); // Check every second
    window.addEventListener("storage", checkToken); // Listen for login/logout in other tabs

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", checkToken);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setTokenExists(false);
    setUserRole(null);
    navigate("/login");
  };

  return (
    <AppBar position="fixed" color="default">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" style={{ color: "green", fontWeight: "bold" }}>
          GUZO
        </Typography>
        <div>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/aboutus">About Us</Button>

          {userRole === "admin" && (
            <Button color="inherit" component={Link} to="/post-trip">
              Post Trip
            </Button>
          )}

          {!tokenExists ? (
            <Button color="inherit" component={Link} to="/login">LOG IN</Button>
          ) : (
            <Button color="inherit" onClick={handleLogout}>LOG OUT</Button>
          )}

          <Button color="inherit" component={Link} to="/SearchTrips">TRIPS</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
