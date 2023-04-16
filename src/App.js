import logo from "./logo.svg";
import "./App.css";
import { Box, Typography } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddItem from "./pages/Additem";
import Items from "./pages/items";
import CartItems from "./pages/CartItems";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Routes>
            <Route path="/items" element={<Items />} />
            <Route path="/cartitems" element={<CartItems />} />
            <Route path="/additem" element={<AddItem />} />
            <Route
              path="/"
              element={
                <Box
                  display="flex"
                  height="100vh"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography variant="h1">Welcome to Me!</Typography>
                </Box>
              }
            />
          </Routes>
        </Box>
      </BrowserRouter>
    </>
  );
}

export default App;
