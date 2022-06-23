import {
  ArrayField,
  ChipField,
  Datagrid,
  List,
  ReferenceField,
  SingleFieldList,
  TextField,
} from "react-admin";

export const PollsList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="question" />
      <TextField source="type" />
      <ReferenceField source="lectureId" reference="lectures">
        <TextField source="name" />
      </ReferenceField>
      <ArrayField source="answerOptions">
        <SingleFieldList>
          <ChipField source="text" />
        </SingleFieldList>
      </ArrayField>
    </Datagrid>
  </List>
);
