import bcrypt from "bcryptjs";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { Link } from "react-router-dom";

import "../../style/teacher/signup.css";

const StudentSignup = () => {
  const initialStudentData = {
    studentId: "",
    firstName: "",
    lastName: "",
    email: "",
    pass: "",
    confPass: "",
  };

  const [studentData, setStudentData] = useState(initialStudentData);
  const [passNotConfirmed, setPassNotConfirmed] = useState(false);

  const onChangeEventHandler = async (e) => {
    e.preventDefault();

    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value,
    });
  };

  const [studentRegistered, setStudentRegistered] = useState();
  const [studentEmailExists, setStudentEmailExists] = useState();
  const [studentIdExists, setStudentIdExists] = useState();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (studentData.pass !== studentData.confPass) {
      if (studentRegistered) {
        setStudentRegistered(false);
      }
      setPassNotConfirmed(true);
      return;
    } else {
      setPassNotConfirmed(false);
    }

    const hashedPass = await bcrypt.hash(studentData.pass, 12);

    fetch(`${process.env.REACT_APP_API_URL}/registerStudent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentData: studentData,
        hashedPass: hashedPass,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.studentEmailExists) {
          setStudentRegistered(false);
          setStudentEmailExists(true);
        }
        if (data.studentIdExists) {
          setStudentRegistered(false);
          setStudentIdExists(true);
        }

        if (data.studentRegistered) {
          setStudentEmailExists(false);
          setStudentIdExists(false);
          setStudentRegistered(true);
        }
      });
  };

  return (
    <div>
      <MDBContainer id="container" className="mt-4">
        <MDBCard>
          <MDBCardBody>
            <p className="h3 text-center mb-4">Sign Up as Student</p>
            <form onSubmit={onSubmitHandler}>
              <MDBRow className="mb-4">
                <MDBCol>
                  <MDBInput
                    onChange={onChangeEventHandler}
                    spellCheck={false}
                    id="StudentId"
                    type="number"
                    name="studentId"
                    label="Student ID"
                    required
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol>
                  <MDBInput
                    onChange={onChangeEventHandler}
                    spellCheck={false}
                    name="firstName"
                    label="First Name"
                    required
                  />
                </MDBCol>
                <MDBCol>
                  <MDBInput
                    onChange={onChangeEventHandler}
                    spellCheck={false}
                    name="lastName"
                    label="Last Name"
                    required
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="mt-4">
                <MDBCol>
                  <MDBInput
                    onChange={onChangeEventHandler}
                    spellCheck={false}
                    type="email"
                    name="email"
                    label="Email"
                    required
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="mt-4">
                <MDBCol>
                  <MDBInput
                    onChange={onChangeEventHandler}
                    spellCheck={false}
                    type="password"
                    name="pass"
                    label="Password"
                    required
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="mt-4">
                <MDBCol>
                  <MDBInput
                    onChange={onChangeEventHandler}
                    spellCheck={false}
                    type="password"
                    name="confPass"
                    label="Confirm password"
                    required
                  />
                </MDBCol>
              </MDBRow>
              {studentRegistered && (
                <p className="h6 text-center mt-4" style={{ color: "green" }}>
                  Student registered successfully !
                </p>
              )}

              {passNotConfirmed && (
                <p className="h6 text-center mt-4" style={{ color: "red" }}>
                  Password not confirmed !
                </p>
              )}

              {(studentEmailExists || studentIdExists) && (
                <p className="h6 text-center mt-4" style={{ color: "red" }}>
                  Student already exists !
                </p>
              )}

              <MDBRow className="mt-4">
                <MDBCol>
                  <MDBBtn type="submit" block>
                    Submit
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </form>
            <p className="mt-4 text-center">
              Already a Student ? <Link to="/student-login">Login</Link>
            </p>
            <p className="h6 text-center mt-4">
              Are you a teacher ?
              <Link to="/teacher-signup"> Sign Up as Teacher </Link>
            </p>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default StudentSignup;
