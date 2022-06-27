import { Create, SimpleForm, TextInput } from "react-admin";

export const LectureCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
    </SimpleForm>
  </Create>
);
