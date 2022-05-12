const { inviteAcceptedSchemaModel } = require("../model/inviteAcceptedModel");

const getStudent = async (req, res) => {
  const { classId } = req.body;

  let studentsNames = [];

  if (!classId) {
    return;
  }

  const students = await inviteAcceptedSchemaModel.find({ classId: classId });

  if (students.length === 0) {
    return;
  }

  students.map((student) => {
    studentsNames.push(
      `${student.studentFirstName} ${student.studentLastName}`
    );
  });

  if (studentsNames.length !== 0) {
    res.json({ studentsNames: studentsNames });
  }
};

module.exports = { getStudent };
