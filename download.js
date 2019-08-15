const http = require("http");
const fs = require("fs");
const MyFirebase = require("./MyFirebase");

const download = (url, dest, cb) => {
  console.log("baixando ", dest, url);
  const file = fs.createWriteStream(dest);

  const request = http.get(url, response => {
    // check if response is success
    if (response.statusCode !== 200) {
      return cb("Response status was " + response.statusCode);
    }

    response.pipe(file);
  });

  // close() is async, call cb after close completes
  file.on("finish", () => file.close(cb));

  // check for request error too
  request.on("error", err => {
    fs.unlink(dest);
    return cb(err.message);
  });

  file.on("error", err => {
    // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    return cb(err.message);
  });
};

const fileTypes = ["json", "geojson"];

const getExtension = fileName => {
  const s = fileName.split(".");
  return s[s.length - 1];
};

exports.downloadRedeAgua = (req, res) => {
  return (
    new Promise((resolve, reject) => {
      if (fs.existsSync(`./files/rda_meireles.json`)) {
        return resolve(`./files/rda_meireles.json`);
      }
      return reject(`File agua was not found.`);
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
};

exports.downloadRedeGas = (req, res) => {
  // Check if the right request is coming through for the file type
  // req.query.file means what file he wants to upload
  return (
    new Promise((resolve, reject) => {
      if (fs.existsSync(`./files/rdg_meireles.json`)) {
        return resolve(`./files/rdg_meireles.json`);
      }
      return reject(`File gas was not found.`);
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
};

exports.downloadRedeEsgoto = (req, res) => {
  // Check if the right request is coming through for the file type
  // req.query.file means what file he wants to upload
  return (
    new Promise((resolve, reject) => {
      if (fs.existsSync(`./files/rde_meireles.json`)) {
        return resolve(`./files/rde_meireles.json`);
      }
      return reject(`File esgoto was not found.`);
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
};
exports.downloadRedeViario = (req, res) => {
  // Check if the right request is coming through for the file type
  // req.query.file means what file he wants to upload
  return (
    new Promise((resolve, reject) => {
      if (fs.existsSync(`./files/rdv_meireles.json`)) {
        return resolve(`./files/rdv_meireles.json`);
      }
      return reject(`File viario was not found.`);
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
};
