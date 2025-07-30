import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <AppBar position="fixed" color="default">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" style={{ color: "green", fontWeight: "bold" }}>
          GUZO
        </Typography>
        <div>
          <Button color="inherit" component={Link} to="/"> Home</Button>
          <Button color="inherit" component={Link} to="/aboutus">About Us</Button>
          <Button color="inherit" component={Link} to="/Login">LOG IN</Button>
          <Button color="inherit" component={Link} to="/SearchTrips">TRIPS</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
