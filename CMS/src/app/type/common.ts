import { TablePaginationConfig } from "antd/es/table";
import { ISchool } from "./school";
import { FilterValue } from "antd/es/table/interface";

export const dateFormat = "DD/MM/YYYY";

export type FieldType = {
  name?: string;
};

export const initValue: ISchool = {
  isDelete: false,
  name: "",
};

export const formatDate = (value: Date): string => {
  var date = new Date(value);

  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

};

export interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

export const options = [
  { label: 'Order', value: 'order' },
  { label: 'Name', value: 'name' },
  { label: 'Establish Date', value: 'date' },
  { label: 'Delete', value: 'isDelete' },
  { label: 'Action', value: 'action' },
];