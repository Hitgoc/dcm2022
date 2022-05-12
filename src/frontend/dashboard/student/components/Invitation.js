import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import NavBar from "./NavBar";
import "../styles/invitation.css";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../shared/context/AuthContext";

const Invitation = () => {
  const context = useContext(AuthContext);

  const [studentEmail, setStudentEmail] = useState();

  const [studentFirstName, setStudentFirstName] = useState();

  const [studentLastName, setStudentLastName] = useState();

  const [classType, setClassType] = useState();

  const [classId, setClassId] = useState();

  const [teacherName, setTeacherName] = useState();

  const [noInvite, setNoInvite] = useState();

  useEffect(() => {
    if (context.studentEmail) {
      const email = context.studentEmail;
      const firstName = context.studentFirstName;
      const lastName = context.studentLastName;
      setStudentFirstName(firstName);
      setStudentLastName(lastName);
      setStudentEmail(email);
    }

    fetch(`${process.env.REACT_APP_API_URL}/invitation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentEmail: studentEmail,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          if (data.noInvite) {
            setNoInvite(true);
          } else {
            setNoInvite(false);
          }

          setClassType(data.classType);
          setClassId(data.classId);
          setTeacherName(data.teacherName);
        }
      });
  }, [
    studentEmail,
    context.studentEmail,
    context.studentFirstName,
    context.studentLastName,
  ]);

  const inviteAccepted = () => {
    fetch(`${process.env.REACT_APP_API_URL}/accepted`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        classId: classId,
        studentEmail: studentEmail,
        studentFirstName: studentFirstName,
        studentLastName: studentLastName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.accepted) {
          window.location.reload();
        } else {
        }
      });
  };

  return (
    <div>
      <NavBar />
      <MDBContainer className="mt-4">
        <MDBCard>
          <MDBCardBody className="h1 text-center">
            <p>Classes invitation</p>
            <MDBCard>
              <MDBCardBody>
                <MDBRow>
                  {!noInvite ? (
                    <>
                      <MDBCol>
                        {classType && teacherName ? (
                          <p className="h3 mt-4 text-center">
                            {`${classType} by ${teacherName}`}
                          </p>
                        ) : (
                          ""
                        )}
                      </MDBCol>
                      <MDBCol>
                        {noInvite ? (
                          ""
                        ) : (
                          <MDBBtn
                            onClick={inviteAccepted}
                            style={{ backgroundColor: "green" }}
                            className="mt-4"
                          >
                            accept
                          </MDBBtn>
                        )}
                      </MDBCol>
                    </>
                  ) : (
                    <p className="h2 text-center">-- No invitations --</p>
                  )}
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default Invitation;
