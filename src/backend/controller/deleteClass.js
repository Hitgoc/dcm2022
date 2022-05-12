const { classSchemaModel } = require("../model/classModel");
const { fileSchemaModel } = require("../model/fileModel");
const { inviteAcceptedSchemaModel } = require("../model/inviteAcceptedModel");

const deleteClass = async (req, res) => {
  const { classId } = req.body;

  if (!classId) {
    return;
  }

  const deleteClass = await classSchemaModel.deleteMany({ classId: classId });

  await inviteAcceptedSchemaModel.deleteMany({ classId: classId });

  if (deleteClass) {
    await fileSchemaModel.deleteMany({});

    res.json({ classDeleted: true });
  } else {
    res.json({ classDeleted: false });
  }
};

module.exports = { deleteClass };
