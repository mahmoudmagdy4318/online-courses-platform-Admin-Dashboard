import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../components/Dashboard/Dashboard";
import Login from "../components/auth/Login";
import Logout from "../components/auth/Logout";
import UserContext from "../context/userContext";
import NewAdmin from "../components/admin/NewAdmin";
import UsersList from "../components/Users/UsersList";
import Categories from "../components/categories/Categories";
import Courses from "../components/courses/Courses";
import Course from "../components/courses/Course";
import CourseForm from "../components/courses/CourseForm";
function Router(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route key="login" exact path="/login" render={() => <Login />} />
        <Route key="logout" exact path="/logout" render={() => <Logout />} />
        <ProtectedRoute
          key="home"
          exact
          path="/"
          render={() => <Dashboard />}
        />
        <ProtectedRoute
          key="admin"
          exact
          path="/admin"
          render={() => <NewAdmin />}
        />
        <ProtectedRoute
          key="users"
          exact
          path="/users"
          render={() => <UsersList />}
        />
        <ProtectedRoute
          key="categories"
          exact
          path="/categories"
          render={() => <Categories />}
        />
        <ProtectedRoute
          key="courses"
          exact
          path="/courses"
          render={() => <Courses />}
        />
        <Route
          key="add course"
          exact
          path="/courses/add"
          render={() => <CourseForm />}
        />
        <Route
          key="add course"
          exact
          path="/courses/edit/:id"
          render={(routeprops) => (
            <CourseForm id={routeprops.match.params.id} />
          )}
        />
        <Route
          key="course"
          exact
          path="/courses/:id"
          render={(routeprops) => <Course id={routeprops.match.params.id} />}
        />

        <Route path="*" render={() => "404 Not Found"} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
