import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import Layout from "../layout/Layout";
import { useEffect } from "react";
import axiosInstance from "../../API/axiosInstance";
import Pagination from "@material-ui/lab/Pagination";
import MovieIcon from "@material-ui/icons/Movie";
import { Typography, ListSubheader, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Courses = () => {
  const classes = useStyles();
  const [courses, setCourses] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const getCourses = async () => {
    const { courses, lastPage } = await axiosInstance.get(
      `courses?page=${pageNum}`
    );
    setCourses(courses);
    setLastPage(Math.ceil(lastPage / 6));
  };
  useEffect(() => {
    getCourses();
  }, [pageNum]);

  const handleChange = (event, value) => {
    setPageNum(value);
  };
  const history = useHistory();
  return (
    <div className={classes.paper}>
      <Typography variant="h6" className={classes.title}>
        Courses
      </Typography>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        onClick={() => history.push("/courses/add")}
      >
        Add New Course
      </Button>
      <List className={classes.root}>
        {courses.map((course) => (
          <ListItem
            key={course._id}
            onClick={() => history.push(`/courses/${course._id}`)}
          >
            <ListItemAvatar>
              <Avatar>
                <MovieIcon />
              </Avatar>
            </ListItemAvatar>
            <ListSubheader style={{ color: "red" }}>
              {course.points}
            </ListSubheader>

            <ListItemText
              primary={course.name}
              secondary={course.description}
            />
          </ListItem>
        ))}
      </List>
      <Pagination
        count={lastPage}
        size="large"
        page={pageNum}
        onChange={handleChange}
      />
    </div>
  );
};
export default Layout(Courses);
