const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  classId: {
    type: String,
    required: true,
  },
  fileId: {
    type: String,
    required: true,
  },
});

const fileSchemaModel = mongoose.model(
  process.env.DB_FILE_COLLECTION_NAME,
  fileSchema
);

module.exports = { fileSchemaModel };
