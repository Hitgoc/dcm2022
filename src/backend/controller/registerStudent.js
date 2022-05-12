const { studentSchemaModel } = require("../model/studentModel");

const registerStudent = async (req, res) => {
  const { studentData, hashedPass } = req.body;

  const registerStudent = new studentSchemaModel({
    studentId: studentData.studentId,
    firstName: studentData.firstName,
    lastName: studentData.lastName,
    email: studentData.email,
    pass: hashedPass,
  });

  let studentEmailExists = false;

  let studentIdExists = false;

  const checkExisitngStudentEmail = await studentSchemaModel.find({
    email: studentData.email,
  });

  const checkExisitngStudentId = await studentSchemaModel.find({
    studentId: studentData.studentId,
  });

  checkExisitngStudentEmail.map((student) => {
    studentEmailExists = true;
  });

  checkExisitngStudentId.map((student) => {
    studentIdExists = true;
  });

  if (studentEmailExists || studentIdExists) {
    res.json({
      studentEmailExists: studentEmailExists,
      studentIdExists: studentIdExists,
    });
    return;
  }

  const dataSaved = await registerStudent.save();

  if (dataSaved) {
    res.json({ studentRegistered: true });
  }
};

module.exports = { registerStudent };
