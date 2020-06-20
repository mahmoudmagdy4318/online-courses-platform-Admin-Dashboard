import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";

import Layout from "../layout/Layout";
import { useEffect } from "react";
import axiosInstance from "../../API/axiosInstance";
import { Paper, IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
    width: "100%",
    maxWidth: "100ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const UsersList = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  const handleChange = (event, value) => {
    setPageNum(value);
  };
  const getUsers = async () => {
    const { users, totalNumber } = await axiosInstance.get(
      `user?page=${pageNum}`
    );
    setUsers(users);
    setLastPage(Math.ceil(totalNumber / 6));
  };

  const handleState = async (id) => {
    await axiosInstance.patch(`admin/user/${id}`);
    setUsers(
      users.map((user) =>
        user._id === id ? { ...user, active: !user.active } : user
      )
    );
  };
  useEffect(() => {
    getUsers();
  }, [pageNum]);
  return (
    <div className={classes.paper}>
      <Typography variant="h6" className={classes.title}>
        Users
      </Typography>
      <List className={classes.root}>
        {users.map((user) => (
          <Fragment key={user.username}>
            <ListItem
              alignItems="flex-start"
              style={{ backgroundColor: !user.active && "gray" }}
            >
              <ListItemAvatar>
                <Avatar alt={user.username} />
              </ListItemAvatar>
              <ListItemText
                primary={user.username}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {user.email}
                      <span
                        style={{ marginLeft: 600, marginRight: 50 }}
                        onClick={() => handleState(user._id)}
                      >
                        <IconButton edge="end" aria-label="state">
                          {user.active ? (
                            <LockIcon />
                          ) : (
                            <LockOpenIcon style={{ color: "white" }} />
                          )}
                        </IconButton>
                      </span>
                    </Typography>
                    <Typography>
                      Total Score:{" "}
                      <span style={{ color: "blue" }}>{user.score}</span>
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </Fragment>
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

export default Layout(UsersList);
