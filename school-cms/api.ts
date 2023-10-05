import { ISchoolPaging } from "@/app/type/schoolPaging";
import axios from "axios";

const baseUrl = "http://localhost:7297/api/School";

export const getAll = async (): Promise<ISchoolPaging> => {
  var rs: ISchoolPaging = {};
  const response = axios.get(`${baseUrl}/GetAll`);
  rs = (await response).data as ISchoolPaging;
  return rs;
};
