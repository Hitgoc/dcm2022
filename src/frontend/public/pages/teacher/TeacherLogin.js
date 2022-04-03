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

const TeacherLogin = () => {
  const initialTeacherData = {
    teacherId: "",
    pass: "",
  };

  const [teacherData, setTeacherData] = useState(initialTeacherData);
  const [invalidCredintials, setInvalidCredintials] = useState(false);

  const onChangeHandler = async (e) => {
    setTeacherData({
      ...teacherData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/teacher-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teacherData: teacherData }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.noTeacher) {
          setInvalidCredintials(true);
          return;
        }

        if (data.token) {
          localStorage.setItem(
            "teacherData",
            JSON.stringify({ teacherToken: data.token })
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
            <p className="h3 text-center mb-4">Login as Teacher</p>
            <form onSubmit={onSubmitHandler}>
              <MDBRow>
                <MDBCol>
                  <MDBInput
                    onChange={onChangeHandler}
                    spellCheck={false}
                    required
                    name="teacherId"
                    type="number"
                    label="Teacher ID"
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
              New Teacher ? <Link to="/teacher-signup">Sign Up</Link>
            </p>
            <p className="h6 text-center mt-4">
              Are you a student ?
              <Link to="/student-login"> Login as Student </Link>
            </p>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default TeacherLogin;
