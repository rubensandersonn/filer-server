const firebase = require("firebase");
require("dotenv").config();

firebase.initializeApp(process.env.FIREBASE_CONFIG);

exports.updateRedeAgua = rede => {
  return new Promise(resolve => {
    firebase
      .database()
      .ref("agua")
      .set({ rede: rede.features })
      .then(res => {
        console.log("agua atualizada");
        resolve(true);
      })
      .catch(err => {
        console.log("erro ao atualizar agua: ", err);
        resolve(false);
      });
  });
};
exports.updateRedeGas = rede => {
  return new Promise(resolve => {
    firebase
      .database()
      .ref("gas")
      .set({ rede: rede.features })
      .then(res => {
        console.log("gas atualizado");
        resolve(true);
      })
      .catch(err => {
        console.log("erro ao atualizar gas: ", err);
        resolve(false);
      });
  });
};
exports.updateRedeEsgoto = rede => {
  return new Promise(resolve => {
    firebase
      .database()
      .ref("esgoto")
      .set({ rede: rede.features })
      .then(res => {
        console.log("esgoto atualizado");
        resolve(true);
      })
      .catch(err => {
        console.log("erro ao atualizar esgoto: ", err);
        resolve(false);
      });
  });
};

exports.updateRedeViario = rede => {
  return new Promise(resolve => {
    firebase
      .database()
      .ref("viario")
      .set({ rede: rede.features })
      .then(res => {
        console.log("viario atualizado");
        resolve(true);
      })
      .catch(err => {
        console.log("erro ao atualizar sistema viario: ", err);
        resolve(false);
      });
  });
};
