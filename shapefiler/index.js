const shapefile = require("shapefile");

exports.handleShapefile = filepath => {
  return new Promise((resolve, reject) => {
    let rede = { type: "FeatureCollection", features: [] };
    shapefile
      .open(filepath)
      .then(source =>
        source.read().then(function log(result) {
          if (result.done) {
            console.log("(shapefiler) tamanho da rede:", rede.features.length);
            resolve(rede);
            return;
          }
          rede.features.push(result.value);
          return source.read().then(log);
        })
      )
      .catch(error => {
        reject(error);
      });
  });
};
