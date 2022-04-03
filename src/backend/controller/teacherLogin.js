const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { teacherSchemaModel } = require("../model/teacherModel");

const teacherLogin = async (req, res) => {
  const { teacherData } = req.body;

  const SK = process.env.TEACHER_SK;
  const SKT = process.env.SKT;

  const data = await teacherSchemaModel.find({
    teacherId: teacherData.teacherId,
  });

  if (data.length === 0) {
    res.json({ noTeacher: true });
    return;
  }

  data.map(async (teacher) => {
    const comparePass = await bcrypt.compare(teacherData.pass, teacher.pass);

    if (comparePass) {
      const token = jwt.sign({ teacherId: teacherData.teacherId }, SK, {
        expiresIn: SKT,
      });
      res.json({ passMatched: true, token: token });
    } else {
      res.json({ passMatched: false });
    }
  });
};

module.exports = { teacherLogin };
