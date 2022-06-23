import * as React from "react";
import { useRecordContext } from "react-admin";

const UserRoleField = ({ source }) => {
  const record = useRecordContext();
  return record ? (record[source] === "A" ? "Admin" : "User") : null;
};

export default UserRoleField;
