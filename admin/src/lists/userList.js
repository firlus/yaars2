import { Datagrid, List, TextField } from "react-admin";
import UserRoleField from "../fields/userRoleField";

export const UserList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <UserRoleField source="role" />
    </Datagrid>
  </List>
);
