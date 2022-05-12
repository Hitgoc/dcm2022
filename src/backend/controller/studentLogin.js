const { studentSchemaModel } = require("../model/studentModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const studentLogin = async (req, res) => {
  const { studentData } = req.body;

  const SK = process.env.STUDENT_SK;
  const SKT = process.env.SKT;

  const data = await studentSchemaModel.find({
    studentId: studentData.studentId,
  });

  if (data.length === 0) {
    res.json({ noStudent: true });
    return;
  }

  data.map(async (student) => {
    const comparePass = await bcrypt.compare(studentData.pass, student.pass);

    if (comparePass) {
      const token = jwt.sign({ studentId: studentData.studentId }, SK, {
        expiresIn: SKT,
      });
      res.json({ passMatched: true, token: token });
    } else {
      res.json({ passMatched: false });
    }
  });
};

module.exports = { studentLogin };
