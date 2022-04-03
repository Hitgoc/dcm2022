const { invitationSchemaModel } = require("../model/invitationModel");
const { inviteAcceptedSchemaModel } = require("../model/inviteAcceptedModel");

const invitationAccepted = async (req, res) => {
  const { studentEmail, studentFirstName, studentLastName, classId } = req.body;

  if (!studentEmail || !studentFirstName || !studentLastName || !classId) {
    return;
  }

  const deleteInvitation = await invitationSchemaModel.deleteMany({
    email: studentEmail,
  });

  const acceptedData = new inviteAcceptedSchemaModel({
    classId: classId,
    studentEmail: studentEmail,
    studentFirstName: studentFirstName,
    studentLastName: studentLastName,
  });

  if (deleteInvitation) {
    const savedData = await acceptedData.save();

    if (savedData) {
      res.json({ accepted: true });
    } else {
      res.json({ accepted: false });
    }
  }
};

module.exports = { invitationAccepted };
