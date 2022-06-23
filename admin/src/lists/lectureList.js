import { Datagrid, List, ReferenceField, TextField } from "react-admin";

export const LectureList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="name" />
    </Datagrid>
  </List>
);
