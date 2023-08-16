const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const filename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

router.post("/resume", upload.single("file"), async (req, res) => {
  const { file } = req;
  console.log("File extension:", path.extname(file.originalname));
  const format = path.extname(file.originalname);

  if (format !== ".pdf") {
    console.log("Invalid format");
    return res.status(400).json({
      message: "Invalid format",
    });
  } else {
    console.log("Valid format");
    const filename = `${uuidv4()}${format}`;

    try {
      const readStream = fs.createReadStream(file.path);
      const writeStream = fs.createWriteStream(
        path.join(__dirname, `../public/resume/${filename}`)
      );

      readStream.pipe(writeStream);

      writeStream.on("finish", () => {
        console.log("File written successfully");
        res.status(200).json({
          message: "File uploaded successfully",
          url: `/host/resume/${filename}`,
        });
      });

      writeStream.on("error", (err) => {
        console.error("Error while writing file:", err);
        res.status(400).json({
          message: "Error while uploading",
          error: err.message,
        });
      });
    } catch (err) {
      console.error("Error during upload:", err);
      res.status(400).json({
        message: "Error while uploading",
        error: err.message,
      });
    }
  }
});





router.post("/profile", upload.single("file"), async (req, res) => {
  const { file } = req;
  console.log("File extension:", path.extname(file.originalname));
  const format = path.extname(file.originalname);

  if (format!= ".jpg" &&
      format!= ".png") {
    console.log("Invalid format");
    return res.status(400).json({
      message: "Invalid format",
    });
  } else {
    console.log("Valid format");
    const filename = `${uuidv4()}${format}`;

    try {
      const readStream = fs.createReadStream(file.path);
      const writeStream = fs.createWriteStream(
        path.join(__dirname, `../public/profile/${filename}`)
      );

      readStream.pipe(writeStream);

      writeStream.on("finish", () => {
        console.log("File written successfully");
        res.status(200).json({
          message: "File uploaded successfully",
          url: `/host/profile/${filename}`,
        });
      });

      writeStream.on("error", (err) => {
        console.error("Error while writing file:", err);
        res.status(400).json({
          message: "Error while uploading",
          error: err.message,
        });
      });
    } catch (err) {
      console.error("Error during upload:", err);
      res.status(400).json({
        message: "Error while uploading",
        error: err.message,
      });
    }
  }
});















// router.post("/profile", upload.single("file"), (req, res) => {
//   const { file } = req;
//   const format=path.extname(file.originalname)
//   if (
//     format!= ".jpg" &&
//     format!= ".png"
//   ) {
//     res.status(400).json({
//       message: "Invalid format",
//     });
//   } else {
//     console.log("valid format")
//     const filename = `${uuidv4()}${format}`;

//     pipeline(
//       file.stream,
//       fs.createWriteStream(`${__dirname}/../public/profile/${filename}`)
//     )
//       .then(() => {
//         res.send({
//           message: "Profile image uploaded successfully",
//           url: `/host/profile/${filename}`,
//         });
//       })
//       .catch((err) => {
//         res.status(400).json({
//           message: "Error while uploading",
//         });
//       });
//   }
// });

module.exports = router;
