"use client";

import React, { useState } from "react";
import { ISchoolPaging } from "../type/schoolPaging";
import { Button } from "react-bootstrap";
import ModalAdd from "./AddModel";
import { Delete, urlGetAll } from "../../../api";
import { toast } from "react-toastify";
import { mutate } from "swr";
import ModalUpdate from "./UpdateModel";
import { ISchool } from "../type/school";

interface IProps {
  ipaging: ISchoolPaging;
}

const Table: React.FC<IProps> = (props) => {
  const { ipaging } = props;
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [school, setSchool] = useState<ISchool | null>(null);

  const DeleteSchool = async (id?: number, name?: string) => {
    if (confirm(`Do you want delete ${name}`)) {
      if (id) {
        var rs = await Delete(id);
        if (rs && rs == 200) {
          toast.success("Delete  school success");
          mutate(urlGetAll);
        } else {
          toast.error("Delete error");
        }
      }
    }
  };

  
  return (
    <div>
      <Button
        className="btn btn-info justify-end"
        onClick={() => setShowAdd(true)}
      >
        Add
      </Button>
      <br />
      <br />
      <table className="table table-xs">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>EstablishDate</th>
            <th>Delete</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ipaging?.schools?.map((x, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{x.name}</td>
              <td>
                {x?.establishDate &&
                  new Date(x?.establishDate ?? "").toLocaleDateString()}
              </td>
              <td className="text-center">
                <input
                  type="checkbox"
                  checked={x.isDelete}
                  className="checkbox checkbox-secondary"
                  onChange={() => console.log()}
                />
              </td>
              <td>
                <Button variant="primary" className="btn btn-accent mx-2" onClick={()=>{
                  setShowUpdate(true);
                  setSchool(x);
                }}>
                  Edit
                </Button>
                <Button
                  variant="secondary"
                  className="btn btn-secondary mx-2"
                  onClick={() => DeleteSchool(x.id, x.name)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalAdd show={showAdd} setShow={setShowAdd} />
      <ModalUpdate show={showUpdate} setShow={setShowUpdate} school={school}/>
    </div>
  );
};

export default Table;
