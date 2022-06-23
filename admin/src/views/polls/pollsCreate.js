import {
  ArrayInput,
  Create,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
} from "react-admin";

export const PollsCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="question" />
      <TextInput source="type" />
      <ReferenceInput source="lectureId" reference="lectures">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ArrayInput source="answerOptions">
        <SimpleFormIterator>
          <TextInput source="text" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);
