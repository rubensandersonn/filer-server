const express = require("express");
const upload = require("./upload");
const cors = require("cors");
require("dotenv").config();

const server = express();

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};

server.use(cors(corsOptions));

server.get("/", (req, res) => {
  const fileTypes = ["json", "geojson"];

  // Check if the right request is coming through for the file type
  return (
    new Promise((resolve, reject) => {
      if (
        req.query.file &&
        fileTypes.indexOf(req.query.file.toLowerCase()) > -1
      ) {
        return resolve(
          `sample.${fileTypes[fileTypes.indexOf(req.query.file.toLowerCase())]}`
        );
      }
      return reject(
        `Please provide a file type of ?file=${fileTypes.join("|")}`
      );
    })
      // Validate if the files exists
      .then(file => {
        return new Promise((resolve, reject) => {
          if (fs.existsSync(`./files/${file}`)) {
            return resolve(`./files/${file}`);
          }
          return reject(`File '${file}' was not found.`);
        });
      })
      // Return the file to download
      .then(filePath => {
        res.download(filePath);
      })
      // Catches errors and displays them
      .catch(e => {
        res.status(400).send({
          message: e
        });
      })
  );
});

server.post("/uploadagua", upload.uploadAgua);
server.post("/uploadgas", upload.uploadGas);
server.post("/uploadesgoto", upload.uploadEsgoto);

server.listen(process.env.PORT || 8000, () => {
  console.log("Server started!");
});
