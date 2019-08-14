const IncomingForm = require("formidable").IncomingForm;
const MyFirebase = require("./MyFirebase");
const fs = require("fs");

exports.uploadAgua = function(req, res) {
  var form = new IncomingForm();

  form.on("file", (type, file) => {
    let rawdata = fs.readFileSync(file.path);
    let rede = JSON.parse(rawdata);
    // console.log("o que chegou", rede);

    MyFirebase.updateRedeAgua(rede);
    // console.log("o que chegou:", type, file.path);
    // you can access it using file.path
  });
  form.on("end", () => {
    res.json();
  });
  form.parse(req);
};

exports.uploadGas = function(req, res) {
  var form = new IncomingForm();

  form.on("file", (type, file) => {
    let rawdata = fs.readFileSync(file.path);
    let rede = JSON.parse(rawdata);
    // console.log("o que chegou", rede);

    MyFirebase.updateRedeGas(rede);
    // console.log("o que chegou:", type, file.path);
    // you can access it using file.path
  });
  form.on("end", () => {
    res.json();
  });
  form.parse(req);
};

exports.uploadEsgoto = function(req, res) {
  var form = new IncomingForm();

  form.on("file", (type, file) => {
    let rawdata = fs.readFileSync(file.path);
    let rede = JSON.parse(rawdata);
    // console.log("o que chegou", rede);

    MyFirebase.updateRedeEsgoto(rede);
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

  form.on("file", (type, file) => {
    let rawdata = fs.readFileSync(file.path);
    let rede = JSON.parse(rawdata);
    // console.log("o que chegou", rede);

    MyFirebase.updateRedeViario(rede);
    // console.log("o que chegou:", type, file.path);
    // you can access it using file.path
  });
  form.on("end", () => {
    res.json();
  });
  form.parse(req);
};
