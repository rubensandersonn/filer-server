const IncomingForm = require("formidable").IncomingForm;
const fs = require("fs");
const path = require("path");
const { handleRar } = require("./rar");
const { handleShapefile } = require("./shapefiler");
const MyFirebase = require("./MyFirebase");

// === === === ===

exports.handleUploads = function(req, res, tipo_rede) {
  var form = new IncomingForm();

  form.on("error", function(err) {
    console.log("erro no formidable:", err);
  });

  form.on("fileBegin", function(name, file) {
    if (file && file.name && getFileType(file.name)) {
      console.log("path do arquivo que chegou", file.path);
    }
  });

  form.on("file", (type, file) => {
    const pathfolder = path.join(__dirname, "files_result", tipo_rede);
    const pathfile = path.join(__dirname, "files_result", tipo_rede, file.name);

    if (file) {
      // === === === ===
      console.log("Arquivo Rede", tipo_rede, "no servidor:", file.path);

      switch (getFileType(file.name)) {
        case "rar":
          // apagando os arquivos antigos
          removeOldFiles(pathfolder);
          // passando pra quem sabe
          handleRar(file.path, pathfolder)
            .then(result => {
              // must return a json like that
              const shpFilename = findShp(pathfolder);

              if (shpFilename) {
                // caminho para o arquivo shp
                const shpPath = path.join(
                  __dirname,
                  "files_result",
                  tipo_rede,
                  "" + shpFilename
                );

                console.log("Arquivo realmente é shp:", shpFilename, shpPath);
                // passando o arquivo para quem sabe
                handleShapefile(shpPath)
                  .then(rede => {
                    // === upload on firebase ===
                    console.log("shapefiles processados");
                    // uploadByTypeOnFirebase(rede, tipo_rede)
                    uploadTest(rede, tipo_rede)
                      .then(resultado => {
                        res.send({ status: 200 });
                      })
                      .catch(err => {
                        console.log("ERRO no firebase:", err);
                        // service unnavailable
                        res.send({ status: 503 });
                      });
                  })
                  .catch(err => {
                    console.log("ERR", err);
                    // bad request
                    res.send({ status: 400 });
                  });
              } else {
                console.log("arquivo shapefile nao encontrado!");
                // bad request
                res.send({ status: 400 });
              }
            })
            .catch(err => {
              console.log(err);
              // bad request
              res.send({ status: 400 });
            });
          break;
        case "json":
          fs.readFile(file.path, "utf8", function(err, raw) {
            if (err) {
              console.log("erro ao abrir o arquivo");
              res.send({ status: 400 });
            }

            // removing old files
            removeOldFiles(pathfolder);

            // parsing data to json
            var rede = JSON.parse(raw);

            if (rede) {
              // === salvando dados no firebase ===
              // uploadByTypeOnFirebase(rede, tipo_rede)
              uploadTest(rede, tipo_rede)
                .then(resultado => {
                  fs.writeFile(pathfile, JSON.stringify(rede), err => {
                    if (err) console.log(err);
                    console.log("Successfully Written to File.");
                  });
                  res.send({ status: 200 });
                })
                .catch(err => {
                  console.log("ERRO no firebase:", err);
                  // service unnavailable
                  res.send({ status: 503 });
                });
            } else {
              // bad request
              res.send({ status: 400 });
              console.log("nao abriu o arquivo...");
            }
          });

          // handleLargeJson(file.path);

          break;

        default:
          // im not a teapot!!!
          res.send({ status: 418 });
          console.log("arquivo nao suportado ou invalido");
          break;
      }
    }
  });

  form.on("end", () => {
    //
  });

  form.parse(req);
};

const removeOldFiles = directory => {
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      if (file !== ".gitsave") {
        fs.unlink(path.join(directory, file), err => {
          if (err) throw err;
        });
      }
    }
  });
};

/**
 * Separa o nome e a extensão do nome do arquivo.extensao
 * @param {String} filename
 */
const splitName = filename => {
  if (!filename) {
    return null;
  }
  const splitted = filename.split(".");
  if (!splitted) {
    return null;
  }
  var name = "";
  for (var i = 0; i < splitted.length - 1; i++) {
    name = name + splitted[i] + ".";
  }

  return { name: name, extension: splitted[splitted.length - 1] };
};

// === === === ===

/**
 * Retorna o tipo do arquivo aceito ou null caso o tipo não seja suportado.
 * @param {String} filename
 */
const getFileType = filename => {
  if (!filename) {
    return false;
  }
  // separa nome e extensao
  const splitted = splitName(filename);

  if (splitted) {
    switch (splitted.extension.toLowerCase()) {
      case "json":
        return "json";
      case "rar":
        return "rar";
      case "zip":
        return "zip";
      default:
        return null;
    }
  }
};

const uploadTest = (rede, type) => {
  return new Promise((resolve, reject) => {
    resolve(true);
  });
};

// === === === ===

const uploadByTypeOnFirebase = (rede, type) => {
  return new Promise((resolve, reject) => {
    if (!rede) {
      reject("(upload by type) rede nula!!!");
    }
    if (type) {
      switch (type) {
        case "gas":
          console.log("rede gas vai ser uploaded");
          MyFirebase.updateRedeGas(rede)
            .then(res => {
              console.log("Rede GAS salva com sucesso no firebase!");
              resolve(true);
            })
            .catch(err => {
              console.log("ERRO AO SALVAR A REDE GAS NO FIREBASE!", err);
            });
          break;
        case "agua":
          console.log("rede água vai ser uploaded");

          MyFirebase.updateRedeAgua(rede)
            .then(res => {
              resolve(true);
              console.log("Rede AGUA salva com sucesso no firebase!");
            })
            .catch(err => {
              reject(err);
              console.log("ERRO AO SALVAR A REDE AGUA NO FIREBASE!", err);
            });

          break;
        case "esgoto":
          MyFirebase.updateRedeEsgoto(rede)
            .then(res => {
              resolve(true);
              console.log("Rede Esgoto salva com sucesso no firebase!");
            })
            .catch(err => {
              reject(err);
              console.log("ERRO AO SALVAR A REDE ESGOTO NO FIREBASE!", err);
            });
          break;
        case "viario":
          MyFirebase.updateRedeViario(rede)
            .then(res => {
              resolve(true);
              console.log("Rede VIARIO salva com sucesso no firebase!");
            })
            .catch(err => {
              reject(err);
              console.log("ERRO AO SALVAR A REDE VIARIO NO FIREBASE!", err);
            });
          break;
        default:
          reject("erro ao chavear");
          console.log("(UPLOAD BY TYPE) ERRO AO CHAVEAR A REDE");
          break;
      }
    } else {
      reject("type is null");
    }
  });
};

const findShp = dirpath => {
  const files = fs.readdirSync(dirpath, "utf8");
  for (var i in files) {
    if (splitName(files[i]).extension === "shp") {
      console.log(files[i]);
      return files[i];
    }
  }
  return null;
};

function copyFile(source, target, cb) {
  var cbCalled = false;

  var rd = fs.createReadStream(source);
  rd.on("error", function(err) {
    done(err);
  });
  var wr = fs.createWriteStream(target);
  wr.on("error", function(err) {
    done(err);
  });
  wr.on("close", function(ex) {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}
