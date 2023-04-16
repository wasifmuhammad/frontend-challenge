import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { CardContext } from "../hooks/contextApi";
import * as _ from "lodash";

function Items() {
  const [itemsRows, setItemsRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setCount } = React.useContext(CardContext);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/items")
      .then(function (response) {
        // handle success
        console.log(response.data);
        setItemsRows([...response.data]);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
        setIsLoading(false);
      });
  }, []);

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
            onClick={() => addToCard(params.row)}
          >
            Add To Card
          </Button>
        );
      },
    },
  ];

  const addToCard = (row) => {
    let flag = false;
    const array = localStorage.getItem("items")
      ? JSON.parse(localStorage.getItem("items"))
      : [];
    array.map((value) => {
      if (value.id === row.id) flag = true;
    });

    if (flag) {
      alert("already added");
      return;
    }
    array.push(row);
    console.log(array);
    localStorage.setItem("items", JSON.stringify(array));
    setCount(array.length);
  };

  // Debounce function to limit the number of times the search function is called
  const debounceSearch = _.debounce((query) => {
    axios
      .get(`http://localhost:3000/items/${query}`)
      .then(function (response) {
        // handle success
        console.log([response.data]);
        if (response.data?.length) setItemsRows([...response.data]);
        else setItemsRows([response.data]);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setItemsRows([]);
      })
      .finally(function () {
        // always executed
        setIsLoading(false);
      });
  }, 800);

  // Handler for the search input change event
  const handleSearchInput = (event) => {
    const query = event.target.value.trim();
    if (/^\d+$/.test(query) || query === "") {
      setQuery(query);
      debounceSearch(query);
    }
  };
  return (
    <Box width={1000} mt={10}>
      <TextField
        fullWidth
        sx={{ marginBlock: 2 }}
        label="Search Here"
        value={query}
        onChange={handleSearchInput}
        placeholder="Enter Valid Number"
      />
      <DataGrid
        rows={itemsRows}
        columns={columns}
        autoHeight
        pagination={false}
        disableColumnMenu
        loading={isLoading}
      />
    </Box>
  );
}

export default Items;
