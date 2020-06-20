import React, { useState, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Snackbar, FormControlLabel, Checkbox } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { validate, validateProperty } from "../../services/validateRegister";
import { register } from "../../services/authService";
import Layout from "../layout/Layout";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const NewAdmin = (props) => {
  const history = useHistory();

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setCreated(false);
  };

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [errors, setErrors] = useState({});
  const [created, setCreated] = useState(false);
  const handleChange = (e) => {
    const errorMessage = validateProperty(e.target);
    if (errorMessage) errors[e.target.name] = errorMessage;
    else delete errors[e.target.name];
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    setErrors(errors);
    if (errors) setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newUser = {
      ...user,
    };
    try {
      delete newUser.password2;
      await register(newUser);
      setCreated(true);
      setUser({ username: "", email: "", password: "", password2: "" });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      {errors.email && (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {errors.email}
          </Alert>
        </Snackbar>
      )}
      {errors.password && (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {errors.password}
          </Alert>
        </Snackbar>
      )}
      {errors.password2 && (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {errors.password2}
          </Alert>
        </Snackbar>
      )}
      {errors.username && (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {errors.username}
          </Alert>
        </Snackbar>
      )}
      {created && (
        <Snackbar open={created} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Created successfully!
          </Alert>
        </Snackbar>
      )}

      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add New Admin
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="User Name"
                autoComplete="user name"
                variant="outlined"
                name="username"
                id="username"
                fullWidth
                required
                value={user.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email Address"
                autoComplete="email"
                variant="outlined"
                name="email"
                id="email"
                fullWidth
                required
                value={user.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="current-password"
                variant="outlined"
                name="password"
                label="Password"
                type="password"
                id="password"
                fullWidth
                required
                value={user.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="current-password"
                label="Confirm Password"
                variant="outlined"
                name="password2"
                type="password"
                id="password2"
                fullWidth
                required
                value={user.password2}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={validate(user)}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};
export default Layout(NewAdmin);
