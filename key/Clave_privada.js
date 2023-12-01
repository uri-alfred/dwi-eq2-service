const fs = require('fs');

const clave_privada_path = 'private1.pem';

//funcion para obtener la clave privada
function obtenerClavePrivada(callback) {
    fs.readFile(clave_privada_path, 'utf8', (err, data) => {
      if (err) {
        console.error('Error leyendo la clave privada:', err);
        return callback(err, null);
      }
      callback(null, data);
    });
  }

// Exporta la función
module.exports = { obtenerClavePrivada };