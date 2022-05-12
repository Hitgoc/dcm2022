const { classSchemaModel } = require("../model/classModel");

const createClass = async (req, res) => {
  const { classData, teacherId, teacherName, classId } = req.body;

  if (!classData.classType || !teacherId || !teacherName) {
    res.json({ noClass: true });
    return;
  }

  const class_data = new classSchemaModel({
    classId: classId,
    classType: classData.classType,
    teacherName: teacherName,
    teacherId: teacherId,
  });

  const checkExistingClass = await classSchemaModel.find({
    teacherId: teacherId,
  });

  if (checkExistingClass.length !== 0) {
    res.json({ classExists: true });
    return;
  }

  const dataSaved = await class_data.save();
  if (dataSaved) {
    res.json({ classCreated: true });
  } else {
    res.json({ classCreated: false });
  }
};

module.exports = { createClass };
