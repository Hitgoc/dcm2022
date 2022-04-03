import React, { useContext, useEffect, useState } from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { Navigate, Route, Routes } from "react-router-dom";
import TeacherDashBoard from "./dashboard/teacher/TeacherDashboard";
import HomePage from "./public/pages/HomePage";
import TeacherLogin from "./public/pages/teacher/TeacherLogin";
import TeacherSignup from "./public/pages/teacher/TeacherSignup";
import StudentLogin from "./public/pages/student/StudentLogin";
import StudentSignup from "./public/pages/student/StudentSignup";
import StudentDashBoard from "./dashboard/student/StudentDashboard";
import AuthContext from "./shared/context/AuthContext";
import CreateClass from "./dashboard/teacher/components/CreateClass";
import InviteStudent from "./dashboard/teacher/components/InviteStudent";
import Invitation from "./dashboard/student/components/Invitation";

const App = () => {
  const context = useContext(AuthContext);

  const [teacherFirstName, setTeacherFirstName] = useState();

  const [teacherLastName, setTeacherLastName] = useState();

  const [studentFirstName, setStudentFirstName] = useState();

  const [studentLastName, setStudentLastName] = useState();

  const [studentEmail, setStudentEmail] = useState();

  const [teacherId, setTeacherId] = useState();

  const storedTeacherToken = JSON.parse(localStorage.getItem("teacherData"));

  const storedStudentToken = JSON.parse(localStorage.getItem("studentData"));

  useEffect(() => {
    if (!storedStudentToken) {
      return;
    }
    fetch(`${process.env.REACT_APP_API_URL}/student-auth`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + storedStudentToken.studentToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStudentFirstName(data.firstName);
        setStudentLastName(data.lastName);
        setStudentEmail(data.email);
      });
  }, [storedStudentToken]);

  useEffect(() => {
    if (!storedTeacherToken) {
      return;
    }
    fetch(`${process.env.REACT_APP_API_URL}/teacher-auth`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + storedTeacherToken.teacherToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTeacherId(data.teacherId);
        setTeacherFirstName(data.firstName);
        setTeacherLastName(data.lastName);
      });
  }, [storedTeacherToken]);

  if (studentFirstName) {
    context.studentFirstName = studentFirstName;
  }

  if (teacherFirstName) {
    context.teacherFirstName = teacherFirstName;
  }

  let routes;

  if (storedTeacherToken) {
    routes = (
      <React.Fragment>
        {/* teacher dashboard routes*/}
        <Route path="/teacher-dashboard" element={<TeacherDashBoard />} />
        <Route
          path="/teacher-login"
          element={<Navigate to="/teacher-dashboard" replace />}
        />

        {/*create class routes */}

        <Route path="/create-a-class" element={<CreateClass />} />
        <Route
          path="/teacher-dashboard"
          element={<Navigate to="/create-a-class" replace />}
        />

        {/*invite student route */}

        <Route path="/invite-student" element={<InviteStudent />} />
        <Route
          path="/teacher-dashboard"
          element={<Navigate to="invite-student" />}
        />
      </React.Fragment>
    );
  } else if (storedStudentToken) {
    routes = (
      <React.Fragment>
        {/*student routes */}

        <Route path="/student-dashboard" element={<StudentDashBoard />} />
        <Route
          path="/student-login"
          element={<Navigate to="/student-dashboard" replace />}
        />
        <Route
          path="/"
          element={<Navigate to="/student-dashboard" replace />}
        />

        {/*invitation route */}

        <Route path="/invitation" element={<Invitation />} />
        <Route
          path="/student-dashboard"
          element={<Navigate to="/invitation" />}
        />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />

        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/teacher-signup" element={<TeacherSignup />} />

        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-signup" element={<StudentSignup />} />
      </React.Fragment>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        teacherFirstName: teacherFirstName,
        teacherLastName: teacherLastName,
        studentFirstName: studentFirstName,
        studentLastName: studentLastName,
        teacherId: teacherId,
        studentEmail: studentEmail,
      }}
    >
      <Routes>{routes}</Routes>
    </AuthContext.Provider>
  );
};
export default App;
