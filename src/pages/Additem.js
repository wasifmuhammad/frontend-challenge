import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Box,
  Grid,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useState, forwardRef } from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const addItemSchema = yup
  .object({
    name: yup.string().required("This field is required"),
    price: yup
      .number()
      .typeError("Invalid number")
      .required("This field is required"),
    image: yup.string().url().required("This field is required"),
  })
  .required();

function AddItem() {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isSuccess, setIsSucess] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      image: "",
    },
    resolver: yupResolver(addItemSchema),
    mode: "onChange",
  });

  const handleSnackBarClick = () => {
    setOpen(true);
  };

  const handleSnackBarClose = () => {
    setOpen(false);
  };
  const handleAddItemSubmit = (addItemData) => {
    setIsLoading(true);
    axios
      .post("http://localhost:3000/items", {
        name: addItemData?.name,
        price: addItemData.price,
        img: addItemData.image,
      })
      .then(function (response) {
        console.log(response);
        setIsSucess(true);
        handleSnackBarClick();
        reset();
      })
      .catch(function (error) {
        console.log(error);
        setIsSucess(false);
        handleSnackBarClick();
      })
      .finally(function () {
        setIsLoading(false);
      });
  };
  if (isLoading) return <CircularProgress />;
  return (
    <>
      {isSuccess !== "" && (
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleSnackBarClose}
          >
            <Alert
              onClose={handleSnackBarClose}
              severity={isSuccess ? "success" : "error"}
              sx={{ width: "100%" }}
            >
              {isSuccess
                ? "This is a success message!"
                : "This is a fail message"}
            </Alert>
          </Snackbar>
        </Stack>
      )}

      <Box>
        <form onSubmit={handleSubmit(handleAddItemSubmit)}>
          <Grid container columnSpacing={5} rowSpacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <Typography
                fontSize={24}
                textAlign="center"
                fontWeight="500"
                mt={5}
              >
                Add Item Here
              </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Controller
                {...{ control }}
                name="name"
                render={({
                  field: { ref, onChange, onBlur, value, name },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <TextField
                    label="Item Name"
                    size="normal"
                    margin="normal"
                    id="name"
                    placeholder="Enter name"
                    fullWidth
                    {...{
                      onChange,
                      onBlur,
                      value,
                      name,
                    }}
                    inputRef={ref}
                  />
                )}
              />

              {errors.name && (
                <Box sx={{ marginTop: "5px" }}>
                  <p> {`${errors.name.message}`} </p>
                </Box>
              )}
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <Controller
                {...{ control }}
                name="price"
                render={({
                  field: { ref, onChange, onBlur, value, name },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <TextField
                    label="Item Price"
                    size="normal"
                    margin="normal"
                    id="price"
                    placeholder="Enter Price"
                    fullWidth
                    {...{
                      onChange,
                      onBlur,
                      value,
                      name,
                    }}
                    inputRef={ref}
                  />
                )}
              />

              {errors.price && (
                <Box sx={{ marginTop: "5px" }}>
                  <p> {`${errors.price.message}`} </p>
                </Box>
              )}
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <Controller
                {...{ control }}
                name="image"
                render={({
                  field: { ref, onChange, onBlur, value, name },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <TextField
                    label="Item Image Link"
                    size="normal"
                    margin="normal"
                    id="image"
                    placeholder="Paste Image Link"
                    fullWidth
                    {...{
                      onChange,
                      onBlur,
                      value,
                      name,
                    }}
                    inputRef={ref}
                  />
                )}
              />

              {errors.image && (
                <Box sx={{ marginTop: "5px" }}>
                  <p> {`${errors.image.message}`} </p>
                </Box>
              )}
            </Grid>

            <Grid item xs={12} md={12} lg={12} mt={5}>
              <Button
                type="submit"
                variant="standard"
                style={{ background: "maroon", color: "white" }}
                fullWidth
              >
                Add Item
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}

export default AddItem;
