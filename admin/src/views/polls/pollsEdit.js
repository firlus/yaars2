import {
  ArrayInput,
  Edit,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
} from "react-admin";

export const PollsEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="question" disabled />
      <TextInput source="type" disabled />
      <ReferenceInput source="lectureId" reference="lectures">
        <SelectInput optionText="name" disabled />
      </ReferenceInput>
      <ArrayInput source="answerOptions">
        <SimpleFormIterator>
          <TextInput source="text" disabled />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);
