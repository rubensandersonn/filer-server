const firebase = require("firebase");
require("dotenv").config();

firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);

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

exports.getURLRedeAgua = () => {
  return new Promise(resolve => {
    firebase
      .storage()
      .ref("redes/rda_meireles.json")
      .getDownloadURL()
      .then(url => {
        resolve(url);
      })
      .catch(err => {
        console.log(
          "erro ao pegar o URL do arquivo georeferencial de água:",
          err
        );
      });
  });
};

exports.getURLRedeGas = () => {
  return new Promise(resolve => {
    firebase
      .storage()
      .ref("redes/rdg_meireles.json")
      .getDownloadURL()
      .then(url => {
        resolve(url);
      })
      .catch(err => {
        console.log(
          "erro ao pegar o URL do arquivo georeferencial de gás:",
          err
        );
      });
  });
};

exports.getURLRedeViario = () => {
  return new Promise(resolve => {
    firebase
      .storage()
      .ref("redes/rdv_meireles.json")
      .getDownloadURL()
      .then(url => {
        resolve(url);
      })
      .catch(err => {
        console.log(
          "erro ao pegar o URL do arquivo georeferencial de sistema viario:",
          err
        );
      });
  });
};

exports.getURLRedeEsgoto = () => {
  return new Promise(resolve => {
    firebase
      .storage()
      .ref("redes/rde_meireles.json")
      .getDownloadURL()
      .then(url => {
        resolve(url);
      })
      .catch(err => {
        console.log(
          "erro ao pegar o URL do arquivo georeferencial de esgoto:",
          err
        );
      });
  });
};
