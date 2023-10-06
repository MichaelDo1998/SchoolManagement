"use client";

import { useState } from "react";
import { InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { Add, urlGetAll } from "../../../api";
import { mutate } from "swr";
import { ISchool } from "../type/school";

interface IProps {
  show: boolean;
  setShow: (value: boolean) => void;
}

function ModalAdd(props: IProps) {
  const { show, setShow } = props;
  const [school, setSchool] = useState<ISchool>({});
  const [dateCreate, setDate] = useState("");

  const handleClose = () => {
    setShow(false);
    mutate(urlGetAll);
    setSchool({});
    setDate("");
  };
  
  const handleSubmit = async () => {
    if (!school?.name) {
      toast.error("Please fill name");
      return;
    }

    if (!school?.establishDate) {
      toast.error("Please fill establish Date");
      return;
    }

    const name = school?.name;
    const isDelete = school?.isDelete;
    const establishDate = school?.establishDate;

    const rs = await Add({ name, isDelete, establishDate });

    if (rs && rs == 200) {
      toast.success("Add school success");
      handleClose();
    } else {
      toast.error("Add error");
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new School</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please fill Name school"
                maxLength={250}
                value={school?.name}
                onChange={(e) => setSchool({ ...school, name: e.target.value })}
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
                  setSchool({
                    ...school,
                    establishDate: new Date(e.target.value),
                  });
                }}
              />
            </Form.Group>
            <InputGroup className="mb-3">
              <Form.Label className="mb-3 mr-3 mt-3">Is Delete</Form.Label>
              <br />
              <InputGroup.Checkbox
                checked={school?.isDelete ?? false}
                onChange={(e) =>
                  setSchool({ ...school, isDelete: e.target.checked })
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

export default ModalAdd;
