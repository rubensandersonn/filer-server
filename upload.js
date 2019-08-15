const IncomingForm = require("formidable").IncomingForm;
const MyFirebase = require("./MyFirebase");
const fs = require("fs");

const fileTypes = ["json", "geojson"];

const getExtension = fileName => {
  const s = fileName.split(".");
  return s[s.length - 1];
};

exports.uploadAgua = function(req, res) {
  var form = new IncomingForm();

  form.on("file", (name, file) => {
    if (name && fileTypes.indexOf(getExtension(name.toLowerCase())) > -1) {
      let rawdata = fs.readFileSync(file.path);
      let rede = JSON.parse(rawdata);
      // console.log("o que chegou", rede);

      // === salvando arquivo no servidor ===
      fs.writeFile("/files/" + name, rede, function(err) {
        if (err) {
          return console.log(err);
        }

        console.log("The file ", name, " was saved!");
      });

      // === salvando dados no firebase ===
      MyFirebase.updateRedeAgua(rede);
      // console.log("o que chegou:", type, file.path);
      // you can access it using file.path
    }
  });
  form.on("end", () => {
    res.json();
  });
  form.parse(req);
};

exports.uploadGas = function(req, res) {
  var form = new IncomingForm();

  form.on("file", (name, file) => {
    if (name && fileTypes.indexOf(getExtension(name.toLowerCase())) > -1) {
      let rawdata = fs.readFileSync(file.path);
      let rede = JSON.parse(rawdata);
      // console.log("o que chegou", rede);

      // === salvando arquivo no servidor ===
      fs.writeFile("/files/" + name, rede, function(err) {
        if (err) {
          return console.log(err);
        }

        console.log("The file ", name, " was saved!");
      });
      // === salvando dados no firebase ===
      MyFirebase.updateRedeGas(rede);
    }
    // console.log("o que chegou:", type, file.path);
  });
  form.on("end", () => {
    res.json();
  });
  form.parse(req);
};

exports.uploadEsgoto = function(req, res) {
  var form = new IncomingForm();

  form.on("file", (name, file) => {
    if (name && fileTypes.indexOf(getExtension(name.toLowerCase())) > -1) {
      let rawdata = fs.readFileSync(file.path);
      let rede = JSON.parse(rawdata);

      // === salvando arquivo no servidor ===
      fs.writeFile("/files/" + name, rede, function(err) {
        if (err) {
          return console.log(err);
        }

        console.log("The file ", name, " was saved!");
      });
      // === salvando dados no firebase ===
      MyFirebase.updateRedeEsgoto(rede);
    }
    // console.log("o que chegou:", type, file.path);
    // you can access it using file.path
  });
  form.on("end", () => {
    res.json();
  });
  form.parse(req);
};

exports.uploadViario = function(req, res) {
  var form = new IncomingForm();

  form.on("file", (name, file) => {
    if (name && fileTypes.indexOf(getExtension(name.toLowerCase())) > -1) {
      let rawdata = fs.readFileSync(file.path);
      let rede = JSON.parse(rawdata);

      // === salvando arquivo no servidor ===
      fs.writeFile("/files/" + name, rede, function(err) {
        if (err) {
          return console.log(err);
        }

        console.log("The file ", name, " was saved!");
      });

      // === salvando dados no firebase ===
      MyFirebase.updateRedeViario(rede);
    }
    // console.log("o que chegou:", type, file.path);
    // you can access it using file.path
  });
  form.on("end", () => {
    res.json();
  });
  form.parse(req);
};
