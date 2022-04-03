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

const TeacherSignup = () => {
  const initialTeacherData = {
    teacherId: "",
    firstName: "",
    lastName: "",
    email: "",
    pass: "",
    confPass: "",
  };

  const [teacherData, setTeacherData] = useState(initialTeacherData);
  const [passNotConfirmed, setPassNotConfirmed] = useState(false);

  const onChangeEventHandler = async (e) => {
    e.preventDefault();

    setTeacherData({
      ...teacherData,
      [e.target.name]: e.target.value,
    });
  };

  const [teacherRegistered, setTeacherRegistered] = useState();
  const [teacherEmailExists, setTeacherEmailExists] = useState();
  const [teacherIdExists, setTeacherIdExists] = useState();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (teacherData.pass !== teacherData.confPass) {
      if (teacherRegistered) {
        setTeacherRegistered(false);
      }
      setPassNotConfirmed(true);
      return;
    } else {
      setPassNotConfirmed(false);
    }

    const hashedPass = await bcrypt.hash(teacherData.pass, 12);

    fetch(`${process.env.REACT_APP_API_URL}/registerTeacher`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teacherData: teacherData,
        hashedPass: hashedPass,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.teacherEmailExists) {
          setTeacherRegistered(false);
          setTeacherEmailExists(true);
        }
        if (data.teacherIdExists) {
          setTeacherRegistered(false);
          setTeacherIdExists(true);
        }

        if (data.teacherRegistered) {
          setTeacherEmailExists(false);
          setTeacherIdExists(false);
          setTeacherRegistered(true);
        }
      });
  };

  return (
    <div>
      <MDBContainer id="container" className="mt-4">
        <MDBCard>
          <MDBCardBody>
            <p className="h3 text-center mb-4">Sign Up as Teacher</p>
            <form onSubmit={onSubmitHandler}>
              <MDBRow className="mb-4">
                <MDBCol>
                  <MDBInput
                    onChange={onChangeEventHandler}
                    spellCheck={false}
                    id="teacherId"
                    type="number"
                    name="teacherId"
                    label="Teacher ID"
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
              {teacherRegistered && (
                <p className="h6 text-center mt-4" style={{ color: "green" }}>
                  Teacher registered successfully !
                </p>
              )}

              {passNotConfirmed && (
                <p className="h6 text-center mt-4" style={{ color: "red" }}>
                  Password not confirmed !
                </p>
              )}

              {(teacherEmailExists || teacherIdExists) && (
                <p className="h6 text-center mt-4" style={{ color: "red" }}>
                  Teacher already exists !
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
              Already a Teacher ? <Link to="/teacher-login">Login</Link>
            </p>
            <p className="h6 text-center mt-4">
              Are you a student ?
              <Link to="/student-signup"> Sign Up as Student </Link>
            </p>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default TeacherSignup;
