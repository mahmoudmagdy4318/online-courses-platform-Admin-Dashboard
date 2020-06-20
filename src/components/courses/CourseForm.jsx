import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import EventNoteIcon from "@material-ui/icons/EventNote";
import DescriptionIcon from "@material-ui/icons/Description";
import Button from "@material-ui/core/Button";
import ScoreIcon from "@material-ui/icons/Score";
import axiosInstance from "../../API/axiosInstance";
import ClassIcon from "@material-ui/icons/Class";
import Layout from "../layout/Layout";
import {
  Snackbar,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  IconButton,
  List,
  ListItemSecondaryAction,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(20),
    display: "flex",
    justifyContent: "center",
  },
}));

const CourseForm = (props) => {
  const [course, setCourse] = useState({
    name: "",
    description: "",
    points: 0,
    categories: [],
  });

  const { id: courseId } = props;
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = React.useState([]);

  const classes = useStyles();
  const history = useHistory();

  //get all categories paginated
  const getCategories = async () => {
    const { categories: cats, lastPage } = await axiosInstance.get(
      `categories?page=${pageNum}`
    );
    setCategories(cats);
    setLastPage(Math.ceil(lastPage));
  };

  //get the course being edited
  const getCourse = async () => {
    const { course: thisCourse } = await axiosInstance.get(
      `courses/${courseId}`
    );
    console.log(thisCourse);
    setCourse(thisCourse);
    setCategories(thisCourse.categories);
    setChecked(thisCourse.categories.map((c) => c._id));
  };

  //check if the component is user for editing
  useEffect(() => {
    if (courseId) getCourse();
  }, []);
  useEffect(() => {
    getCategories();
  }, [pageNum]);

  //handle changes of inputs
  const onChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  //submit adding or editing post
  const onSubmit = async (e) => {
    delete course["_id"];
    const body = {
      ...course,
      categories: checked,
    };
    const request = !courseId
      ? axiosInstance.post("courses", body)
      : axiosInstance.patch(`courses/${courseId}`, body);
    try {
      const { course: c } = await request;
      history.push(`/courses/${c._id}`);
    } catch (err) {
      setError(err);
      setOpen(true);
    }
  };

  //   *******************************
  //handle teggling categories checkboxes
  const handleToggle = (id) => () => {
    const category = checked.find((c) => c === id);
    if (!category) {
      setChecked([...checked, id]);
    } else {
      setChecked(checked.filter((c) => c !== id));
    }
  };
  // **********************************
  return (
    <div className={classes.root}>
      {error && (
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
        >
          <Alert onClose={() => setOpen(false)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={6}>
          <React.Fragment>
            {courseId ? (
              <Typography variant="h6" gutterBottom>
                Update Course Data
              </Typography>
            ) : (
              <Typography variant="h6" gutterBottom>
                Add New Course
              </Typography>
            )}

            <Grid container spacing={3}>
              <Grid item xs={9}>
                <TextField
                  required
                  value={course.name}
                  id="name"
                  name="name"
                  label="Course Name"
                  fullWidth
                  variant="outlined"
                  autoComplete="given-name"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <EventNoteIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={9}>
                <TextField
                  value={course.description}
                  required
                  variant="outlined"
                  id="description"
                  name="description"
                  label="Course Description"
                  fullWidth
                  autoComplete="family-name"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <DescriptionIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={9}>
                <TextField
                  required
                  value={course.points}
                  variant="outlined"
                  id="points"
                  name="points"
                  label="Course Points"
                  fullWidth
                  type="number"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <ScoreIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={9}>
                {/* ********************* */}
                <List>
                  {categories.map((category) => {
                    const labelId = `checkbox-list-label-${category._id}`;

                    return (
                      <ListItem
                        key={category._id}
                        role={undefined}
                        dense
                        button
                        onClick={handleToggle(category._id)}
                      >
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={
                              checked.find((cat) => cat === category._id)
                                ? true
                                : false
                            }
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={category.name} />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="categories">
                            <ClassIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
                <Pagination
                  count={lastPage}
                  color="primary"
                  onChange={(event, value) => setPageNum(value)}
                />
                {/* ***************************** */}
              </Grid>

              <Grid item xs={9}>
                <Button
                  onClick={onSubmit}
                  variant="contained"
                  color="primary"
                  fullWidth
                  size={"large"}
                >
                  submit
                </Button>
              </Grid>
            </Grid>
          </React.Fragment>
        </Grid>
      </Grid>
    </div>
  );
};
export default Layout(CourseForm);
