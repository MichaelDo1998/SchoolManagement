import React from "react";
import { ISchoolPaging } from "../type/schoolPaging";
import School from "./School";

const ListSchool: React.FC<ISchoolPaging> = ({ schools, totalCount }) => {
  return (
    <div>
      <table className="table table-xs">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>EstablishDate</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {schools?.map((x, index) => (
            <School school={x} index={index} key={index}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListSchool;
