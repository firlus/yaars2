import * as React from "react";
import {
  Admin,
  ListGuesser,
  Resource,
  fetchUtils,
  EditGuesser,
} from "react-admin";
import jsonServerProvider from "ra-data-json-server";
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

const httpClient = (url, options = {}) => {
  options.user = {
    authenticated: true,
    token: localStorage.getItem("jwt"),
  };
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = jsonServerProvider(
  `http://${process.env.REACT_APP_HOSTNAME}:5000`,
  httpClient
);

const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider} requireAuth>
    {localStorage.getItem("role") === "A" ? (
      <Resource
        name="users"
        list={UserList}
        edit={UserEdit}
        create={UserCreate}
      />
    ) : (
      <></>
    )}
    <Resource
      name="lectures"
      list={LectureList}
      edit={LectureEdit}
      create={LectureCreate}
    />
    <Resource
      name="polls"
      list={PollsList}
      edit={PollsEdit}
      create={PollsCreate}
    />
  </Admin>
);

export default App;
