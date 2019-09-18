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

server.get("/downloadagua", (req, res) =>
  download.downloadFile(req, res, "agua")
);
server.get("/downloadgas", (req, res) =>
  download.downloadFile(req, res, "gas")
);
server.get("/downloadesgoto", (req, res) =>
  download.downloadFile(req, res, "esgoto")
);
server.get("/downloadviario", (req, res) =>
  download.downloadFile(req, res, "viario")
);

server.listen(process.env.PORT || 8000, () => {
  console.log(
    "Server started at port " + (process.env.PORT ? process.env.PORT : 8000)
  );
});
