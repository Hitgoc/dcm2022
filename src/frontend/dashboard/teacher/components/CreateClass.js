import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import AuthContext from "../../../shared/context/AuthContext";
import "../styles/createClass.css";
import NavBar from "./NavBar";
import uuid from "react-uuid";

const CreateClass = () => {
  const initialClassData = {
    classType: "",
  };

  const context = useContext(AuthContext);

  const [classData, setClassData] = useState(initialClassData);

  const [teacherName, setTeacherName] = useState();

  const [teacherId, setTeacherId] = useState();

  const [classCreated, setClassCreated] = useState();

  const [classExists, setClassExists] = useState();

  useEffect(() => {
    if (
      context.teacherId ||
      context.teacherFirstName ||
      context.teacherLastName
    ) {
      setTeacherId(context.teacherId);

      const teacher_name = `${context.teacherFirstName} ${context.teacherLastName}`;

      setTeacherName(teacher_name);
    }
  }, [context.teacherFirstName, context.teacherLastName, context.teacherId]);

  const [noInput, setNoInput] = useState();

  const onClassTypeChange = (e) => {
    setClassData({ ...classData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    if (!classData.classType) {
      setNoInput(true);
      return;
    } else {
      setNoInput(false);
    }

    const classId = uuid();

    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/create-a-class`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        classData: classData,
        teacherId: teacherId,
        teacherName: teacherName,
        classId: classId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.classExists) {
          setClassCreated(false);
          setClassExists(true);
          return;
        }

        setClassExists(false);

        if (data.classCreated) {
          setClassCreated(true);
        } else {
          setClassCreated(false);
        }
      });
  };

  return (
    <div>
      <NavBar />
      <MDBContainer id="container" className="mt-4">
        <MDBCard>
          <MDBCardBody>
            <p className="h3 text-center">Create a class</p>

            <MDBRow className="mt-4">
              <MDBCol className="mt-4">
                <Form.Select
                  name="classType"
                  required
                  onChange={onClassTypeChange}
                >
                  <option hidden>Class Type</option>
                  <option>Artificial Intelligence</option>
                  <option>Computer Vision</option>
                  <option>Cosmology</option>
                  <option>Cyber Security and Forensics</option>
                </Form.Select>
              </MDBCol>
            </MDBRow>
            {classCreated && (
              <p style={{ color: "green" }} className="mt-4 text-center h6">
                Class created successfully !
              </p>
            )}
            {classExists && (
              <p style={{ color: "red" }} className="mt-4 text-center h6">
                Please end previous class to start another !
              </p>
            )}
            {noInput && (
              <p style={{ color: "red" }} className="mt-4 text-center h6">
                Please select a class type !
              </p>
            )}
            <MDBRow>
              <MDBCol>
                <MDBBtn
                  onClick={onSubmitHandler}
                  type="submit"
                  className="mt-4"
                  block
                >
                  Create
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default CreateClass;
