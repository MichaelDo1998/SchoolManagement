"use client";

import React, { useState } from "react";
import { ISchoolPaging } from "../type/schoolPaging";
import ModalAdd from "./AddModel";
import { Delete } from "../../../api";
import { toast } from "react-toastify";
import ModalUpdate from "./UpdateModel";
import { ISchool } from "../type/school";
import { Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

interface IProps {
  ipaging: ISchoolPaging;
}

const initValue: ISchool = {
  isDelete: false,
  name: "",
  id: 0,
};

const Table: React.FC<IProps> = (props) => {
  const { ipaging } = props;
  const [showUpdate, setShowUpdate] = useState(false);
  const [school, setSchool] = useState<ISchool>({
    ...initValue,
  });
  const router = useRouter();

  const DeleteSchool = async (id?: number, name?: string) => {
    if (confirm(`Do you want delete ${name}`)) {
      if (id) {
        var rs = await Delete(id);
        if (rs && rs == 200) {
          toast.success("Delete  school success");
          router.refresh();
        } else {
          toast.error("Delete error");
        }
      }
    }
  };

  return (
    <div>
      <ModalAdd />
      <br />
      <br />
      <table className="table table-xs">
        <thead>
          <tr>
            <th></th>
            <th className="text-center">Name</th>
            <th className="text-center">EstablishDate</th>
            <th className="text-center">Delete</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {(ipaging ?? {})?.schools?.map((x, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td className="text-center">{x.name}</td>
              <td className="text-center">
                {x.establishDate &&
                  new Date(x?.establishDate ?? "").toLocaleDateString()}
              </td>
              <td className="text-center">{x.isDelete && <CheckOutlined />}</td>
              <td className="text-center">
                <Button
                  type="dashed"
                  className="mx-2"
                  onClick={() => {
                    setShowUpdate(true);
                    setSchool(x ?? {});
                  }}
                >
                  Edit
                </Button>
                <Button
                  type="link"
                  className="mx-2"
                  onClick={() => DeleteSchool(x.id, x.name)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalUpdate
        show={showUpdate}
        setShow={setShowUpdate}
        school={school ?? {}}
      />
    </div>
  );
};

export default Table;
