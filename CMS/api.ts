const baseUrl = "http://localhost:7297/api/School";
export const urlGetAll = `${baseUrl}/GetAll`;
const headers = {
  "Content-Type": "application/json, text/plain, */*",
  accept: "*/*",
  "Access-Control-Allow-Origin": "*",
};

export const Add = async (data: any): Promise<any> => {
  var rs = await fetch(`${baseUrl}/Add`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: headers,
    mode: "cors",
  });

  return rs.status;
};

export const Delete = async (id?: number): Promise<any> => {
  var rs = await fetch(`${baseUrl}/Delete/${id}`, {
    method: "DELETE",
    headers: headers,
    mode: "cors",
  });

  return rs.status;
};

export const Update = async (data: any): Promise<any> => {
  var rs = await fetch(`${baseUrl}/Update`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: headers,
    mode: "cors",
  });

  return rs.status;
};
