const mongoose = require("mongoose");

const inviteAcceptedSchema = new mongoose.Schema({
  classId: {
    type: String,
    required: true,
  },
  studentFirstName: {
    type: String,
    required: true,
  },
  studentLastName: {
    type: String,
    required: true,
  },
  studentEmail: {
    type: String,
    required: true,
  },
});

const inviteAcceptedSchemaModel = mongoose.model(
  process.env.DB_ACCEPTED_INVITATION,
  inviteAcceptedSchema
);

module.exports = { inviteAcceptedSchemaModel };
