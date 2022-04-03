const { classSchemaModel } = require("../model/classModel");

const getClass = async (req, res) => {
  const { teacherId } = req.body;

  let classTypeArray = [];

  let classIdArray = [];

  const getClass = await classSchemaModel.find({ teacherId: teacherId });

  getClass.map((CLASS) => {
    classTypeArray.push(CLASS.classType);
    classIdArray.push(CLASS.classId);
  });

  if (getClass) {
    const recentClassType = classTypeArray[classTypeArray.length - 1];
    const recentClassId = classIdArray[classIdArray.length - 1];

    res.json({
      recentClassId: recentClassId,
      recentClassType: recentClassType,
    });
  }
};

module.exports = { getClass };
