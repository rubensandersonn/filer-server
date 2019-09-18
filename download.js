const path = require("path");
const fs = require("fs");
const { zipFolder } = require("./rar");
const MyFirebase = require("./MyFirebase");

/**
 * Receives a req, res in http style and a tipo_rede to switch the folder to zip
 */
exports.downloadFile = (req, res, tipo_rede) => {
  const pathfolder = path.join(__dirname, "files_result", tipo_rede);
  const pathfile = path.join(
    __dirname,
    "files_result",
    tipo_rede,
    "download.zip"
  );
  return (
    new Promise((resolve, reject) => {
      if (fs.existsSync(pathfolder)) {
        return resolve(pathfolder);
      }
      return reject("File", tipo_rede, "was not found.");
    })
      // Return the file to download
      .then(folderPath => {
        removeOldZipFiles(folderPath);
        zipFolder(folderPath, pathfile)
          .then(result => {
            console.log("baixando:", pathfile);
            res.download(pathfile);
          })
          .catch(err => {
            console.log(err);
            res.status(400).send({
              message: err
            });
          });
      })
      // Catches errors and displays them
      .catch(e => {
        res.status(400).send({
          message: e
        });
      })
  );
};

const removeOldZipFiles = directory => {
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      if (file.match(/\.zip$/)) {
        fs.unlink(path.join(directory, file), err => {
          if (err) throw err;
        });
      }
    }
  });
};
