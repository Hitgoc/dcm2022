const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  classId: {
    type: String,
    required: true,
  },
  classType: {
    type: String,
    required: true,
  },
  teacherName: {
    type: String,
    required: true,
  },
  teacherId: {
    type: Number,
    required: true,
  },
});

const classSchemaModel = mongoose.model(
  process.env.DB_CLASS_COLLECTION_NAME,
  classSchema
);

module.exports = { classSchemaModel };
