const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  classId: {
    type: String,
    required: true,
  },
  classType: {
    type: String,
    required: true,
  },
  teacherFirstName: {
    type: String,
    required: true,
  },
  teacherLastName: {
    type: String,
    required: true,
  },
});

const invitationSchemaModel = mongoose.model(
  process.env.DB_INVITATION_COLLECTION_NAME,
  invitationSchema
);

module.exports = { invitationSchemaModel };
