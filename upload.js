const IncomingForm = require("formidable").IncomingForm;
const MyFirebase = require("./MyFirebase");
const fs = require("fs");
const path = require("path");

const fileTypes = ["json", "json"];

const getExtension = fileName => {
  const s = fileName.split(".");
  return s[s.length - 1];
};

const isJson = filename => {
  if (!filename) {
    return false;
  }
  const splitted = filename.split(".");

  if (splitted && splitted[splitted.length - 1] === "json") {
    return true;
  }
  if (splitted && splitted[splitted.length - 1] === "geojson") {
    return true;
  }
  return false;
};

exports.uploadAgua = function(req, res) {
  var form = new IncomingForm();

  form.on("fileBegin", function(name, file) {
    if (file && isJson(file.name)) {
      file.name = "rda_meireles.json";
      file.path = path.join(__dirname, "files", file.name);
      console.log("(rede agua) comecou a chegar", file.name);
    }
  });

  form.on("file", (type, file) => {
    if (file && isJson(file.name)) {
      console.log("Rede Agua atualizada no servidor:", file.path);
      let raw = fs.readFileSync(file.path, "utf8");
      let rede = JSON.parse(raw);

      if (rede) {
        // === salvando dados no firebase ===
        MyFirebase.updateRedeGas(rede)
          .then(res => {
            console.log("Rede Agua salva  com sucesso no firebase!");
          })
          .catch(err => {
            console.log("ERRO AO SALVAR A REDE AGUA NO FIREBASE!", err);
          });
      } else {
        console.log("nao abriu o arquivo...");
      }
    }
  });

  form.on("end", () => {
    res.send({
      status: 200
    });
  });

  form.parse(req);
};

exports.uploadGas = function(req, res) {
  var form = new IncomingForm();

  form.on("fileBegin", function(name, file) {
    if (file && isJson(file.name)) {
      file.name = "rdg_meireles.json";
      file.path = path.join(__dirname, "files", file.name);
      console.log("(rede gas) comecou a chegar", file.name);
    }
  });

  form.on("file", (type, file) => {
    if (file && isJson(file.name)) {
      console.log("Rede gas atualizada no servidor:", file.path);
      let raw = fs.readFileSync(file.path, "utf8");
      let rede = JSON.parse(raw);

      if (rede) {
        console.log("...a rede existe...");
        // === salvando dados no firebase ===
        MyFirebase.updateRedeGas(rede)
          .then(res => {
            console.log("Rede Gas salva  com sucesso no firebase!");
          })
          .catch(err => {
            console.log("ERRO AO SALVAR A REDE GAS NO FIREBASE!", err);
          });
      } else {
        console.log("nao abriu o arquivo...");
      }
    }
  });

  form.on("end", () => {
    res.send({
      status: 200
    });
  });

  form.parse(req);
};

exports.uploadEsgoto = function(req, res) {
  var form = new IncomingForm();

  form.on("fileBegin", function(name, file) {
    if (file && isJson(file.name)) {
      file.name = "rde_meireles.json";
      file.path = path.join(__dirname, "files", file.name);
      console.log("(rede esgoto) comecou a chegar", file.name);
    }
  });

  form.on("file", (type, file) => {
    if (file && isJson(file.name)) {
      console.log("Rede Esgoto atualizada no servidor:", file.path);
      let raw = fs.readFileSync(file.path, "utf8");
      let rede = JSON.parse(raw);

      if (rede) {
        // === salvando dados no firebase ===
        MyFirebase.updateRedeGas(rede)
          .then(res => {
            console.log("Rede Esgoto salva  com sucesso no firebase!");
          })
          .catch(err => {
            console.log("ERRO AO SALVAR A REDE ESGOTO NO FIREBASE!", err);
          });
      } else {
        console.log("nao abriu o arquivo...");
      }
    }
  });

  form.on("end", () => {
    res.send({
      status: 200
    });
  });

  form.parse(req);
};

exports.uploadViario = function(req, res) {
  var form = new IncomingForm();

  form.on("fileBegin", function(name, file) {
    if (file && isJson(file.name)) {
      file.name = "rdv_meireles.json";
      file.path = path.join(__dirname, "files", file.name);
      console.log("(rede viario) comecou a chegar", file.name);
    }
  });

  form.on("file", (type, file) => {
    if (file && isJson(file.name)) {
      console.log("Rede Viario atualizada no servidor:", file.path);
      let raw = fs.readFileSync(file.path, "utf8");
      let rede = JSON.parse(raw);

      if (rede) {
        // === salvando dados no firebase ===
        MyFirebase.updateRedeGas(rede)
          .then(res => {
            console.log("Rede Viario salva  com sucesso no firebase!");
          })
          .catch(err => {
            console.log("ERRO AO SALVAR A REDE ESGOTO NO FIREBASE!", err);
          });
      } else {
        console.log("nao abriu o arquivo...");
      }
    }
  });

  form.on("end", () => {
    res.send({
      status: 200
    });
  });

  form.parse(req);
};
