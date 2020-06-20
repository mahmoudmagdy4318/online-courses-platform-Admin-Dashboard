import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../layout/Layout";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axiosInstance from "../../API/axiosInstance";
import _ from "lodash";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  CardHeader,
  ListSubheader,
} from "@material-ui/core";
import ClassIcon from "@material-ui/icons/Class";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  catList: {
    marginTop: 5,
  },
}));

const Course = (props) => {
  const { id } = props;
  const classes = useStyles();
  const [courseData, setCourseData] = useState({});
  const history = useHistory();

  //get course data on mounting the component
  const getCourse = async () => {
    const { course } = await axiosInstance.get(`courses/${id}`);
    console.log(course);
    setCourseData(course);
  };
  useEffect(() => {
    getCourse();
  }, []);

  //handle deleting course
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`courses/${id}`);
      history.push("/courses");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={classes.paper}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="/favicon.ico"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {courseData.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {courseData.description}
            </Typography>
            <ListSubheader style={{ color: "red" }}>
              {courseData.points} points
            </ListSubheader>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => history.push(`/courses/edit/${id}`)}
          >
            Edit
          </Button>
          <Button size="small" color="primary" onClick={handleDelete}>
            Delete
          </Button>
        </CardActions>
      </Card>
      {_.get(courseData, "categories.length") ? (
        <Card className={classes.catList}>
          <CardContent>
            <ListSubheader>Course Categories</ListSubheader>
            <List>
              {courseData.categories.map((category) => (
                <ListItem key={category.name}>
                  <ListItemAvatar>
                    <Avatar>
                      <ClassIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={category.name} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      ) : (
        <></>
      )}
    </div>
  );
};
export default Layout(Course);
