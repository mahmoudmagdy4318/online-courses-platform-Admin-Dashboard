import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { IconButton, Snackbar } from "@material-ui/core";
import { useState } from "react";
import Alert from "@material-ui/lab/Alert";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
  },
  addBtn: {
    marginRight: 10,
    fontSize: 30,
  },
}));

export default function BasicTextFields(props) {
  const classes = useStyles();
  const { onAdd } = props;
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  return (
    <div className={classes.root}>
      <IconButton
        edge="end"
        aria-label="add"
        onClick={() =>
          onAdd(category)
            .then((res) => {
              setCategory("");
              setOpen(true);
            })
            .catch((err) => {
              setErrorMessage(err.split(",")[1]);
              setError(true);
            })
        }
      >
        <AddCircleIcon className={classes.addBtn} />
      </IconButton>
      <TextField
        id="outlined-basic"
        label="add category"
        variant="outlined"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      {open && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
        >
          <Alert onClose={() => setOpen(false)} severity="success">
            Created successfully!
          </Alert>
        </Snackbar>
      )}
      {error && (
        <Snackbar
          open={error}
          autoHideDuration={3000}
          onClose={() => setError(false)}
        >
          <Alert onClose={() => setError(false)} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}
