const mongoose = require("mongoose");
const { Schema } = mongoose;

const teacherSchema = new Schema({
  teacherId: {
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

const teacherSchemaModel = mongoose.model(
  process.env.DB_TEACHER_COLLECTION_NAME,
  teacherSchema
);

teacherSchemaModel.collection.createIndex({ teacherId: 1 }, { unique: true });
teacherSchemaModel.collection.createIndex({ email: 1 }, { unique: true });

module.exports = { teacherSchemaModel };
