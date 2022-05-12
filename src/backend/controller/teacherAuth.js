const jwt = require("jsonwebtoken");
const { teacherSchemaModel } = require("../model/teacherModel");

const teacherAuth = async (req, res) => {
  const teacherToken = req.headers.authorization.split(" ")[1];

  const decodedTeacherToken = jwt.verify(teacherToken, process.env.TEACHER_SK);

  req.data = { teacherId: decodedTeacherToken };

  const teacherId = req.data.teacherId;

  const teacherData = await teacherSchemaModel.find({
    teacherId: teacherId.teacherId,
  });

  if (teacherData.length === 0) {
    return;
  }

  const firstName = teacherData[0].firstName;
  const lastName = teacherData[0].lastName;
  const teacherID = teacherData[0].teacherId;

  res.json({ firstName: firstName, lastName: lastName, teacherId: teacherID });
};

module.exports = { teacherAuth };
