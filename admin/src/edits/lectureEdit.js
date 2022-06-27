import { Edit, SimpleForm, TextInput } from "react-admin";

export const LectureEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" />
    </SimpleForm>
  </Edit>
);
