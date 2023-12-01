const dotenv = require('dotenv');
dotenv.config({ path: ".env" });
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const jwt = require("jsonwebtoken");
const { obtenerClavePrivada } = require('./key/Clave_privada')
let clave_privada;
const cookiePar = require("cookie-parser")
const cors = require("cors");


obtenerClavePrivada((err, res) => {
  if (err) {
    console.error('Error obteniendo la clave privada:', err);
    process.exit(1);
  }
  clave_privada = res
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json())

app.use(cookiePar())
app.use(cors({
  origin: 'http://localhost:3000',
  allowedHeaders: ["Content-Type", "Authorization", 'x-csrf-token'],
  allowedMethods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  maxAge: 600,
  exposedHeaders: ['*', 'Authorization']
}));

/**
 * midelwere para verificar token
 */

let token = "";
function verificarToken(req, res, next) {
    // Obtener el token de la cookie o de donde lo estés enviando
    
    if (!req.cookies['auth-token']) {
        token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiY2VzYXJPcnRpekBnbWFpbC5jb20iLCJpYXQiOjE3MDExNDQxMjYsImV4cCI6MTcwMTMxNjkyNn0.JZbvmONwus1XO6Bmz1qDosQwLrTG5kAYw3EFNUrN-3DDRU-DBciXI-2BW54vsutTuSMWXGJLB2IB1O6DR0MKLKNXiAOISCG3IL56ZsIWT6haPQ-EXO7UC5qA7ubSagUCTgiM_leNK66wbCy42U6GwFF977IZrt8B0obmTe-9MrCmb9r3GfMRIZEa7ts6TFgzU7a_8FRb8pt0GwSHfOi8dT43Mh3ea_99h9EmcMZfCe4WGfxq4C5S10hbc5G7SaehlKBEx4Y9iFpZ74KuSs9egM8rvZHKm51rrVXIdZkIzI0-b3WAvlVjXeCPZxo31ZI1-1oYA8omxi7vF6y_VxUrig'
    } else {
        token = req.cookies['auth-token'];
        // console.log(req.cookies)
    }
  
    // Verificar si el token existe
    if (!token) {
      return res.status(401).json({ error: 'Acceso no autorizado. Token no proporcionado.' });
    }
    // Verificar si el token es valido
    // Verificar el token
    // console.log(token)
    jwt.verify(token, clave_privada, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Acceso no autorizado. Token inválido.' });
      }
  
      // Almacenar la información del usuario en el objeto de solicitud para su uso posterior
      req.usuario = decoded.user;
      next();
    });
  }

const libros = require("./rutas/api/libros");
const categoriesRouter = require("./rutas/api/categories")
const usuario = require("./rutas/api/usuarios");
const login = require("./rutas/api/login")

app.use('/api/books', verificarToken, libros)
app.use("/api/categories", verificarToken,  categoriesRouter)
app.use("/api/usuarios", verificarToken, usuario)
app.use("/api/login", login)

app.listen(process.env.PORT || 3000, () => {
  console.log(`Servicio iniciado correctamente en el puerto ${process.env.PORT || 3000}`)
})