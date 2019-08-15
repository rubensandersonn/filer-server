const express = require("express");
const upload = require("./upload");
const download = require("./download");
const cors = require("cors");
require("dotenv").config();

const server = express();

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};

server.use(cors(corsOptions));

server.post("/uploadagua", upload.uploadAgua);
server.post("/uploadgas", upload.uploadGas);
server.post("/uploadesgoto", upload.uploadEsgoto);
server.post("/uploadviario", upload.uploadViario);
server.get("/downloadagua", download.downloadRedeAgua);
server.get("/downloadgas", download.downloadRedeGas);
server.get("/downloadesgoto", download.downloadRedeEsgoto);
server.get("/downloadviario", download.downloadRedeViario);

server.listen(process.env.PORT || 8000, () => {
  console.log("Server started!");
});
