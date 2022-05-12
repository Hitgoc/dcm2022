const express = require("express");
const { teacherLogin } = require("../controller/teacherLogin");
const { registerTeacher } = require("../controller/registerTeacher");
const { registerStudent } = require("../controller/registerStudent");
const { studentLogin } = require("../controller/studentLogin");
const { studentAuth } = require("../controller/studentAuth");
const { teacherAuth } = require("../controller/teacherAuth");
const { createClass } = require("../controller/createClass");
const { getClass } = require("../controller/getClass");
const { deleteClass } = require("../controller/deleteClass");
const { inviteStudent } = require("../controller/inviteStudent");
const { invitation } = require("../controller/invitation");
const { invitationAccepted } = require("../controller/invitationAccepted");
const { getStudent } = require("../controller/getStudent");
const { uploadFile } = require("../controller/uploadFile");
const { getStudentClass } = require("../controller/getStudentClass");
const router = express.Router();

//teacher routes

router.use("/registerTeacher", registerTeacher);

router.use("/teacher-login", teacherLogin);

//student routes

router.use("/registerStudent", registerStudent);

router.use("/student-login", studentLogin);

//auth student routes

router.use("/student-auth", studentAuth);

//auth teacher routes

router.use("/teacher-auth", teacherAuth);

//create a class route

router.use("/create-a-class", createClass);
router.use("/getClass", getClass);
router.use("/deleteClass", deleteClass);

//invite student route

router.use("/invite-student", inviteStudent);

//student invitation

router.use("/invitation", invitation);

// invite acceptd

router.use("/accepted", invitationAccepted);

//get students

router.use("/getStudent", getStudent);

//upload video

router.use("/uploadFile", uploadFile);

//get student class

router.use("/getStudentClass", getStudentClass);

module.exports = { router };
