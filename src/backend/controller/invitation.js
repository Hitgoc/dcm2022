const { invitationSchemaModel } = require("../model/invitationModel");

const invitation = async (req, res) => {
  const { studentEmail } = req.body;

  if (!studentEmail) {
    return;
  }

  const invitation = await invitationSchemaModel.find({ email: studentEmail });

  if (invitation.length === 0) {
    res.json({ noInvite: true });
    return;
  }

  if (invitation) {
    const classType = invitation[0].classType;
    const classId = invitation[0].classId;
    const teacherName = `${invitation[0].teacherFirstName} ${invitation[0].teacherLastName}`;

    res.json({
      classType: classType,
      teacherName: teacherName,
      classId: classId,
    });
  }
};

module.exports = { invitation };
