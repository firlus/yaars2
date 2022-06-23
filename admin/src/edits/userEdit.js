import { Edit, SimpleForm, TextInput } from "react-admin";

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" disabled />
      <TextInput source="role" disabled />
    </SimpleForm>
  </Edit>
);
