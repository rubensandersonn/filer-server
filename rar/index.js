var { unrar } = require("unrar-promise");
var fs = require("fs");

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
