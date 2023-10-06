"use client";

import { useEffect, useState } from "react";
import { InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { Update, urlGetAll } from "../../../api";
import { mutate } from "swr";
import { ISchool } from "../type/school";

interface IProps {
  show: boolean;
  setShow: (value: boolean) => void;
  school: ISchool;
}

const initValue: ISchool = {
  isDelete: false,
  name: "",
};

function ModalUpdate(props: IProps) {
  const { show, setShow, school } = props;
  const [schoolUpdate, setSchool] = useState<ISchool | null>({
    ...initValue,
  });
  const [dateCreate, setDate] = useState("");

  useEffect(() => {
    if (school && school.id) {
      setSchool({ ...school });
      var dateT = new Date(school?.establishDate ?? "");
      if (school?.establishDate)
        setDate(
          `${dateT.getFullYear()}-${dateT.getMonth() + 1}-${dateT.getDate()}`
        );
    }
  }, [show]);

  const handleClose = () => {
    setShow(false);
    mutate(urlGetAll);
    setSchool({ ...initValue });
    setDate("");
  };

  const handleSubmit = async () => {
    if (!schoolUpdate?.name) {
      toast.error("Please fill name");
      return;
    }

    if (!schoolUpdate?.establishDate) {
      toast.error("Please fill establish Date");
      return;
    }

    const name = schoolUpdate?.name;
    const isDelete = schoolUpdate?.isDelete;
    const establishDate = schoolUpdate?.establishDate;
    const id = schoolUpdate?.id;

    const rs = await Update({ name, isDelete, establishDate, id });

    if (rs && rs == 200) {
      toast.success("Update school success");
      handleClose();
    } else {
      toast.error("Update error");
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update School</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please fill Name school"
                maxLength={250}
                value={schoolUpdate?.name}
                onChange={(e) =>
                  setSchool({ ...schoolUpdate, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Establish Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Please select date establish"
                value={dateCreate}
                onChange={(e) => {
                  setDate(e.target.value);
                  console.log(dateCreate);
                  setSchool({
                    ...schoolUpdate,
                    establishDate: new Date(e.target.value),
                  });
                }}
              />
            </Form.Group>
            <InputGroup className="mb-3">
              <Form.Label className="mb-3 mr-3 mt-3">Is Delete</Form.Label>
              <br />
              <InputGroup.Checkbox
                checked={schoolUpdate?.isDelete ?? false}
                onChange={(e) =>
                  setSchool({ ...schoolUpdate, isDelete: e.target.checked })
                }
              />
            </InputGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdate;
