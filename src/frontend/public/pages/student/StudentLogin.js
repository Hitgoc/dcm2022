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

import "../../style/teacher/login.css";

const StudentLogin = () => {
  const initialStudentData = {
    studentId: "",
    pass: "",
  };

  const [studentData, setStudentData] = useState(initialStudentData);
  const [invalidCredintials, setInvalidCredintials] = useState(false);

  const onChangeHandler = async (e) => {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/student-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studentData: studentData }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.noStudent) {
          setInvalidCredintials(true);
          return;
        }

        if (data.token) {
          localStorage.setItem(
            "studentData",
            JSON.stringify({ studentToken: data.token })
          );

          window.location.reload();

          setInvalidCredintials(false);
        } else {
          setInvalidCredintials(true);
        }
      });
  };

  return (
    <div>
      <MDBContainer id="container" className="mt-4">
        <MDBCard>
          <MDBCardBody>
            <p className="h3 text-center mb-4">Login as Student</p>
            <form onSubmit={onSubmitHandler}>
              <MDBRow>
                <MDBCol>
                  <MDBInput
                    onChange={onChangeHandler}
                    spellCheck={false}
                    required
                    name="studentId"
                    type="number"
                    label="Student ID"
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="mt-4">
                <MDBCol>
                  <MDBInput
                    onChange={onChangeHandler}
                    spellCheck={false}
                    required
                    name="pass"
                    type="password"
                    label="Password"
                  />
                </MDBCol>
              </MDBRow>
              {invalidCredintials && (
                <p className="mt-4 text-center h6" style={{ color: "red" }}>
                  Invalid Credintials !
                </p>
              )}
              <MDBRow>
                <MDBCol>
                  <MDBBtn type="submit" block className="mt-4">
                    Login
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </form>
            <p className="h6 text-center mt-4">
              New Student ? <Link to="/student-signup">Sign Up</Link>
            </p>
            <p className="h6 text-center mt-4">
              Are you a teacher ?
              <Link to="/teacher-login"> Login as Teacher </Link>
            </p>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default StudentLogin;
