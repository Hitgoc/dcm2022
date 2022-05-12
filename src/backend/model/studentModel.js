const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  studentId: {
    type: Number,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pass: {
    type: String,
    required: true,
  },
});

const studentSchemaModel = mongoose.model(
  process.env.DB_STUDENT_COLLECTION_NAME,
  studentSchema
);

studentSchemaModel.collection.createIndex({ studentId: 1 }, { unique: true });
studentSchemaModel.collection.createIndex({ email: 1 }, { unique: true });

module.exports = { studentSchemaModel };
