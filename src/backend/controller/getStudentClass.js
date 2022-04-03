const { classSchemaModel } = require("../model/classModel");
const { fileSchemaModel } = require("../model/fileModel");
const { inviteAcceptedSchemaModel } = require("../model/inviteAcceptedModel");

const getStudentClass = async (req, res) => {
  const { studentEmail } = req.body;

  if (!studentEmail) {
    return;
  }

  const studentClass = await inviteAcceptedSchemaModel.find({
    studentEmail: studentEmail,
  });

  let fileArray = [];

  if (studentClass.length !== 0) {
    const classData = await classSchemaModel.find({
      classId: studentClass[0].classId,
    });

    const studyMaterial = await fileSchemaModel.find({
      classId: classData[0].classId,
    });

    let noFile;

    if (studyMaterial.length !== 0) {
      studyMaterial.map((fileId) => {
        fileArray.push(fileId.fileId);
      });

      if (fileArray.length !== 0) {
        noFile = false;
      }
    } else {
      noFile = true;
    }

    if (classData) {
      res.json({
        classType: classData[0].classType,
        classId: classData[0].classId,
        teacherName: classData[0].teacherName,
        fileArray: !noFile ? fileArray : [],
      });
    }
  }
};

module.exports = { getStudentClass };
