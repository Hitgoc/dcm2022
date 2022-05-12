import { createContext } from "react";

const AuthContext = createContext({
  studentFirstName: "",
  teacherFirstName: "",
  teacherLastName: "",
  studentLastName: "",
  teacherId: "",
  studentId: "",
  studentEmail: "",
});

export default AuthContext;
