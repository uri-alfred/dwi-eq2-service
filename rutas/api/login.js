const express = require("express");
const ControllerUsuario = require("../../controllers/Usuarios");
const RepositorioUsuario = require("../../database/RepositorioUsuarios");
const controlador = new ControllerUsuario(new RepositorioUsuario());
const router = express.Router();
const jwt = require("jsonwebtoken");
const { obtenerClavePrivada } = require('../../key/Clave_privada')
let clave_privada;

obtenerClavePrivada((err, res) => {
    if (err) {
      console.error('Error obteniendo la clave privada:', err);
      process.exit(1);
    }
    clave_privada = res
  });

  /** Logear usuario */
router.post("/", async (req, res) => {
    console.log("Llega al router:", req.body);
    const result = await controlador.validarLoginUsuario(
      req.body.email,
      req.body.password
    );
       console.log("res " + result);
    if (!result)
      return res.status(400).json({ error: "Usuario o pasword incorrecto" });
    else {
      const token = jwt.sign(
        {
          user: req.body.email,
        },
        clave_privada,
        {
          algorithm: "RS256",
          expiresIn: 172800,
        }
      );
  
      // Guardar el token en la cookie
      res.cookie("auth-token", token, {
          httpOnly: true,
          secure: true,
          domain: "localhost",
          path: "/",
          sameSite: "lax"
      });
  
      //  console.log(token);
      const datares = await controlador.obtenerUsuarioPorEmail(
        req.body.email
      )
  
      // mandar mensaje de login exitoso
      res.status(200).json({
        message: "Login successfully.",
        user: datares,
      });
      
    }
  });

  module.exports = router;