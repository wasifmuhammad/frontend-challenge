import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { CardContext } from "../hooks/contextApi";

function CartItems() {
  const [itemsRows, setItemsRows] = useState(
    localStorage.getItem("items")
      ? JSON.parse(localStorage.getItem("items"))
      : []
  );
  const { count, setCount } = React.useContext(CardContext);
  const columns = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "name",
      headerName: "Item Name",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Item Price",
      flex: 1,
    },
    {
      field: "img",
      headerName: "Image",
      flex: 1,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noreferrer">
          View Image
        </a>
      ),
    },

    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        return (
          <Button
            variant="standard"
            style={{
              background: "maroon",
              color: "white",
              fontWeight: "600",
              fontSize: 14,
            }}
            onClick={() => removeFromCart(params.row)}
          >
            Remove from Cart
          </Button>
        );
      },
    },
  ];

  const removeFromCart = (row) => {
    if (localStorage.getItem("items") && count > 0) {
      console.log(JSON.parse(localStorage.getItem("items")));
      const array = JSON.parse(localStorage.getItem("items")).filter(
        (item) => item.id !== row.id
      );
      localStorage.setItem("items", JSON.stringify(array));
      setItemsRows(array);
      setCount(array.length);
    }
  };
  return (
    <Box width={1000} mt={10}>
      <DataGrid
        rows={itemsRows}
        columns={columns}
        autoHeight
        pagination={false}
        disableColumnMenu
      />
    </Box>
  );
}

export default CartItems;
