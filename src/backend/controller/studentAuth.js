const jwt = require("jsonwebtoken");
const { studentSchemaModel } = require("../model/studentModel");

const studentAuth = async (req, res) => {
  const studentToken = req.headers.authorization.split(" ")[1];

  const decodedStudentToken = jwt.verify(studentToken, process.env.STUDENT_SK);

  req.data = { studentId: decodedStudentToken };

  const studentId = req.data.studentId;

  const studentData = await studentSchemaModel.find({
    studentId: studentId.studentId,
  });

  if (studentData.length === 0) {
    return;
  }

  const firstName = studentData[0].firstName;
  const lastName = studentData[0].lastName;
  const email = studentData[0].email;

  res.json({ firstName: firstName, lastName: lastName, email: email });
};

module.exports = { studentAuth };
