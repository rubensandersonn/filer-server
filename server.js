const express = require("express");
const { handleUploads } = require("./handleUploads");
const download = require("./download");
const cors = require("cors");
require("dotenv").config();

const server = express();

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};

server.use(cors(corsOptions));

server.post("/uploadagua", (req, res) => handleUploads(req, res, "agua"));
server.post("/uploadgas", (req, res) => handleUploads(req, res, "gas"));
server.post("/uploadesgoto", (req, res) => handleUploads(req, res, "esgoto"));
server.post("/uploadviario", (req, res) => handleUploads(req, res, "viario"));

server.get("/downloadagua", download.downloadRedeAgua);
server.get("/downloadgas", download.downloadRedeGas);
server.get("/downloadesgoto", download.downloadRedeEsgoto);
server.get("/downloadviario", download.downloadRedeViario);

server.listen(process.env.PORT || 8000, () => {
  console.log(
    "Server started at port " + (process.env.PORT ? process.env.PORT : 8000)
  );
});
