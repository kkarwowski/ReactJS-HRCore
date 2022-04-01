import { associatesContext } from "../utils/context/contexts";
import { useContext } from "react";

export function GetAssociateDetails(id) {
  const { associates } = useContext(associatesContext);
  const associate = associates.filter((associatee) => associatee.id === id);
  return associate[0];
}
