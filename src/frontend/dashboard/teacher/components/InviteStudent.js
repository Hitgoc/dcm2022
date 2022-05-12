import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import NavBar from "./NavBar";
import "../styles/inviteStudent.css";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../shared/context/AuthContext";

const InviteStudent = () => {
  const initalData = {
    firstName: "",
    lastName: "",
    email: "",
  };

  const context = useContext(AuthContext);

  const [inviteData, setInviteData] = useState(initalData);

  const [inviteSent, setInviteSent] = useState();

  const [noStudent, setNoStudent] = useState();

  const [alreadyInvited, setAlreadyInvited] = useState();

  const onChangehandler = (e) => {
    setInviteData({ ...inviteData, [e.target.name]: e.target.value });
  };

  const teacherId = context.teacherId;

  const [classType, setClassType] = useState();

  const [classId, setClassId] = useState();

  const [noClass, setNoClass] = useState();

  const [studentInClass, setStudentInClass] = useState();

  useEffect(() => {
    if (!teacherId) {
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/getClass`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teacherId: teacherId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setClassType(data.recentClassType);
          setClassId(data.recentClassId);
        }
      });
  }, [teacherId]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!inviteData.firstName) {
      return;
    }

    const teacherFirstName = context.teacherFirstName;

    const teacherLastName = context.teacherLastName;

    fetch(`${process.env.REACT_APP_API_URL}/invite-student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inviteData: inviteData,
        teacherFirstName: teacherFirstName,
        teacherLastName: teacherLastName,
        classType: classType,
        classId: classId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.studentInClass) {
          setStudentInClass(true);
          setInviteSent(false);
          setNoClass(false);
          setNoStudent(false);
          setNoStudent(false);
          setAlreadyInvited(false);
          return;
        } else {
          setStudentInClass(false);
        }

        if (data.noClass) {
          setNoClass(true);
          setStudentInClass(false);
          setInviteSent(false);
          setNoStudent(false);
          setInviteSent(false);
          setNoStudent(false);
          setNoStudent(false);
          setAlreadyInvited(false);
          return;
        }

        if (data.alreadyInvited) {
          setStudentInClass(false);
          setNoClass(false);
          setInviteSent(false);
          setNoStudent(false);
          setAlreadyInvited(true);
          return;
        } else {
          setStudentInClass(false);
          setNoClass(false);
          setAlreadyInvited(false);
        }
        setNoClass(false);

        if (data.inviteSent) {
          setStudentInClass(false);
          setNoClass(false);
          setInviteSent(true);
          setNoStudent(false);
        } else {
          setStudentInClass(false);
          setNoClass(false);
          setInviteSent(false);
          setNoStudent(true);
        }
      });
  };

  return (
    <div>
      <NavBar />
      <MDBContainer className="mt-4" id="container">
        <MDBCard>
          <MDBCardBody>
            <p className="h3 text-center mb-4">Invite Student</p>
            <form onSubmit={onSubmitHandler}>
              <MDBRow>
                <MDBCol>
                  <MDBInput
                    spellCheck={false}
                    required
                    onChange={onChangehandler}
                    name="firstName"
                    label="First Name"
                  />
                </MDBCol>
                <MDBCol>
                  <MDBInput
                    spellCheck={false}
                    required
                    onChange={onChangehandler}
                    name="lastName"
                    label="Last Name"
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="mt-4">
                <MDBCol>
                  <MDBInput
                    spellCheck={false}
                    required
                    onChange={onChangehandler}
                    type="email"
                    name="email"
                    label="Email"
                  />
                </MDBCol>
              </MDBRow>
              {inviteSent && (
                <p style={{ color: "green" }} className="h6 text-center mt-4">
                  Invite sent successfully !
                </p>
              )}
              {noStudent && (
                <p style={{ color: "red" }} className="h6 text-center mt-4">
                  Student does not exist !
                </p>
              )}
              {alreadyInvited && (
                <p style={{ color: "green" }} className="h6 text-center mt-4">
                  Already invited !
                </p>
              )}
              {noClass && (
                <p style={{ color: "red" }} className="h6 text-center mt-4">
                  Please create a class first !
                </p>
              )}
              {studentInClass && (
                <p style={{ color: "red" }} className="h6 text-center mt-4">
                  Student already in a class !
                </p>
              )}
              <MDBRow>
                <MDBCol>
                  <MDBBtn type="submit" className="mt-4" block>
                    Invite
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default InviteStudent;
