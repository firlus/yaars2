import * as React from "react";
import {
  Admin,
  ListGuesser,
  Resource,
  fetchUtils,
  EditGuesser,
  Login,
} from "react-admin";
import jsonServerProvider from "ra-data-json-server";

import UserIcon from "@mui/icons-material/Group";
import LectureIcon from "@mui/icons-material/School";
import PollIcon from "@mui/icons-material/Poll";

import authProvider from "./provider/authProvider";
import { UserList } from "./lists/userList";
import { LectureList } from "./lists/lectureList";
import { LectureEdit } from "./edits/lectureEdit";
import { LectureCreate } from "./creates/lectureCreate";
import { UserEdit } from "./edits/userEdit";
import { UserCreate } from "./creates/userCreate";
import { PollsList } from "./views/polls/pollsList";
import { PollsEdit } from "./views/polls/pollsEdit";
import { PollsCreate } from "./views/polls/pollsCreate";
import Dashboard from "./views/dashboard";
import myTheme from "./views/theme";

const httpClient = (url, options = {}) => {
  options.user = {
    authenticated: true,
    token: localStorage.getItem("jwt"),
  };
  return fetchUtils.fetchJson(url, options);
};

const hostname = process.env.REACT_APP_HOSTNAME || "localhost";

console.log(hostname);

const dataProvider = jsonServerProvider(`http://${hostname}:5000`, httpClient);

const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    theme={myTheme}
    loginPage={Login}
    dashboard={Dashboard}
    requireAuth
  >
    {localStorage.getItem("role") === "A" ? (
      <Resource
        name="users"
        list={UserList}
        edit={UserEdit}
        create={UserCreate}
        icon={UserIcon}
      />
    ) : (
      <></>
    )}
    <Resource
      name="lectures"
      list={LectureList}
      edit={LectureEdit}
      create={LectureCreate}
      icon={LectureIcon}
    />
    <Resource
      name="polls"
      list={PollsList}
      edit={PollsEdit}
      create={PollsCreate}
      icon={PollIcon}
    />
  </Admin>
);

export default App;
