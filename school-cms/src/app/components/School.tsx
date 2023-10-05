'use client'

import React, { useState } from "react";
import { ISchool } from "../type/school";

interface SchoolProps {
  school: ISchool;
  index: number;
}

const School: React.FC<SchoolProps> = ({ school, index }) => {
  const [checked, setChecked] = useState(false);
  return (
    <tr>
      <th>{index}</th>
      <td>{school.name}</td>
      <td>{school?.establishDate.toString()}</td>
      <td>
        <input
          type="checkbox"
          checked={school.isDelete}
          className="checkbox checkbox-secondary"
          onChange={() => console.log()}
        />
      </td>
    </tr>
  );
};

export default School;
