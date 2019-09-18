var { unrar } = require("unrar-promise");
var fs = require("fs");
var zipdir = require("zip-dir");

exports.handleRar = (rarpath, rar_dest) => {
  return new Promise((resolve, reject) => {
    unrar(rarpath, rar_dest, {
      filter({ path, type }) {
        return type === "File"; // && /\.txt$/.test(path); //  *.txt file only
      },
      overwrite: true
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

exports.zipFolder = (sourceFolder, pathfile) => {
  return new Promise((resolve, reject) => {
    // zipper.zip(sourceFolder, function(error, zipped) {
    //   if (!error) {
    //     zipped.compress(); // compress before exporting

    //     // save the zipped file to disk
    //     zipped.save(pathfile, function(error) {
    //       if (error) {
    //         console.log("Error !", error);
    //         reject(error);
    //       } else {
    //         console.log("saved successfully !");
    //         resolve(true);
    //       }
    //     });
    //   }
    // });

    zipdir(sourceFolder, { saveTo: pathfile }, function(err, buffer) {
      // `buffer` is the buffer of the zipped file
      // And the buffer was saved to `~/myzip.zip`
      if (err) reject(err);
      resolve(true);
    });
  });
};
