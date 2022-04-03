const cloudinary = require("../cloud/cloudinary");
const { fileSchemaModel } = require("../model/fileModel");

const uploadFile = async (req, res) => {
  const { fileString, classId } = req.body;

  if (!fileString) {
    return;
  }

  try {
    const upload = await cloudinary.uploader.upload(fileString, {
      upload_preset: "dcm",
      resource_type: "auto",
      chunk_size: 6000000,
      eager: [
        { width: 300, height: 300, crop: "pad", audio_codec: "none" },
        {
          width: 160,
          height: 100,
          crop: "crop",
          gravity: "south",
          audio_codec: "none",
        },
      ],
      eager_async: true,
    });

    if (upload) {
      const fileData = new fileSchemaModel({
        classId: classId,
        fileId: upload.public_id,
      });

      if (fileData) {
        await fileData.save();
      }
      res.json({ uploaded: true });
    } else {
      res.json({ uploaded: false });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { uploadFile };
