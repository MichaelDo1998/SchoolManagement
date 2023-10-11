import { ISchool } from "./school";

export const dateFormat = "DD/MM/YYYY";

export type FieldType = {
  name?: string;
};

export const initValue: ISchool = {
  isDelete: false,
  name: "",
};
