const { teacherSchemaModel } = require("../model/teacherModel");

const registerTeacher = async (req, res) => {
  const { teacherData, hashedPass } = req.body;

  if (!teacherData || !hashedPass) {
    return;
  }

  const registerTeacher = new teacherSchemaModel({
    teacherId: teacherData.teacherId,
    firstName: teacherData.firstName,
    lastName: teacherData.lastName,
    email: teacherData.email,
    pass: hashedPass,
  });

  let teacherEmailExists = false;

  let teacherIdExists = false;

  const checkExisitngTeacherEmail = await teacherSchemaModel.find({
    email: teacherData.email,
  });

  const checkExisitngTeacherId = await teacherSchemaModel.find({
    teacherId: teacherData.teacherId,
  });

  checkExisitngTeacherEmail.map((teacher) => {
    teacherEmailExists = true;
  });

  checkExisitngTeacherId.map((teacher) => {
    teacherIdExists = true;
  });

  if (teacherEmailExists || teacherIdExists) {
    res.json({
      teacherEmailExists: teacherEmailExists,
      teacherIdExists: teacherIdExists,
    });
    return;
  }

  const dataSaved = await registerTeacher.save();

  if (dataSaved) {
    res.json({ teacherRegistered: true });
  }
};

module.exports = { registerTeacher };
