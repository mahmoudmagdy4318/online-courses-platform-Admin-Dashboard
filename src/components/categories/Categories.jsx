import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import ClassIcon from "@material-ui/icons/Class";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Layout from "../layout/Layout";
import { useEffect } from "react";
import axiosInstance from "../../API/axiosInstance";
import Pagination from "@material-ui/lab/Pagination";
import EditModal from "./EditModal";
import AddCategory from "./AddCategory";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(50),
    display: "flex",
    justifyContent: "center",
  },
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const Categories = () => {
  const classes = useStyles();
  const [pageNum, setPageNum] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [updatingCategory, setUpdatingCategory] = useState({});
  const [open, setOpen] = useState(false);
  const getCategories = async () => {
    const { categories, lastPage } = await axiosInstance.get(
      `categories?page=${pageNum}`
    );
    setCategories(categories);
    setLastPage(Math.ceil(lastPage));
  };
  useEffect(() => {
    getCategories();
  }, [pageNum]);
  const handleChange = (event, value) => {
    setPageNum(value);
  };
  const handleDelete = (id) => async () => {
    try {
      await axiosInstance.delete(`categories/${id}`);
      setCategories(categories.filter((cat) => cat._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (id) => (name) => {
    return axiosInstance.patch(`categories/${id}`, { name }).then((res) => {
      setCategories(
        categories.map((cat) => (cat._id === id ? { ...cat, name: name } : cat))
      );
    });
  };

  const handleAdding = (name) => {
    return axiosInstance.post("categories", { name }).then(({ category }) => {
      setCategories([category, ...categories]);
    });
  };
  return (
    <div className={classes.paper}>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className={classes.title}>
              Categories
            </Typography>
            <div className={classes.demo}>
              <List>
                {categories.map((category) => (
                  <ListItem key={category.name}>
                    <ListItemAvatar>
                      <Avatar>
                        <ClassIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={category.name} />
                    <ListItemSecondaryAction>
                      <IconButton
                        aria-label="edit"
                        onClick={() => {
                          setUpdatingCategory(category);
                          setOpen(true);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={handleDelete(category._id)}
                      >
                        <DeleteIcon style={{ color: "red" }} />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </div>
            <Pagination
              count={lastPage}
              size="large"
              page={pageNum}
              onChange={handleChange}
            />
            <AddCategory onAdd={handleAdding} />
          </Grid>
        </Grid>
      </div>

      <EditModal
        open={open}
        setOpen={setOpen}
        category={updatingCategory}
        onEdit={handleEdit(updatingCategory._id)}
      />
    </div>
  );
};
export default Layout(Categories);
