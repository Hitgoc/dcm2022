const { invitationSchemaModel } = require("../model/invitationModel");
const { inviteAcceptedSchemaModel } = require("../model/inviteAcceptedModel");
const { studentSchemaModel } = require("../model/studentModel");

const inviteStudent = async (req, res) => {
  const { inviteData, teacherFirstName, teacherLastName, classType, classId } =
    req.body;

  if (
    !inviteData.email ||
    !teacherFirstName ||
    !teacherLastName ||
    !classId ||
    !classType
  ) {
    res.json({ noClass: true });
    return;
  }

  const studentExists = await studentSchemaModel.find({
    email: inviteData.email,
  });

  if (studentExists.length !== 0) {
    const studentInClass = await inviteAcceptedSchemaModel.find({
      studentEmail: inviteData.email,
    });

    if (studentInClass.length !== 0) {
      res.json({ studentInClass: true });
      return;
    }

    const existingInvitation = await invitationSchemaModel.find({
      email: inviteData.email,
    });

    if (existingInvitation.length !== 0) {
      res.json({ alreadyInvited: true });
      return;
    }

    const invitationData = new invitationSchemaModel({
      email: inviteData.email,
      classId: classId,
      classType: classType,
      teacherFirstName: teacherFirstName,
      teacherLastName: teacherLastName,
    });

    const dataSaved = await invitationData.save();

    if (dataSaved) {
      res.json({ inviteSent: true });
    }
  } else {
    res.json({ inviteSent: false });
  }
};

module.exports = { inviteStudent };
