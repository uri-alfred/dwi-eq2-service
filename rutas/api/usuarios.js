const express = require("express");
const ControllerUsuario = require("../../controllers/Usuarios");
const RepositorioUsuario = require("../../database/RepositorioUsuarios");
const controlador = new ControllerUsuario(new RepositorioUsuario());
const router = express.Router();

/** Consulta todos los usuarios */
router.get("/", async (req, res) => {
  controlador.obtenerUsuario().then((usuarios) => res.json(usuarios));
});

/** Consulta un usuario por id */
router.get("/:id", async (req, res) => {
  console.log("Llega al router:", req.params);
  controlador
    .obtenerUsuarioPorId(req.params.id)
    .then((usuarios) => res.json(usuarios));
});

/** Guarda un usuario */
router.post("/", async (req, res) => {
  controlador.agregarUsuario(req.body.email, req.body.password, req.body.nombre, req.body.apellido);
  res.status(200);
  res.json({ message: "Usuario creado" });
});

/** Actualiza un usuario */
router.put("/", async (req, res) => {
  console.log("actualizar");
  controlador.actualizarUsuario(req.body);
  res.status(200);
  res.json({ message: "Usuario actualizado." });
});

/** Elimina un usuario */
router.delete("/:id", async (req, res) => {
  controlador.eliminarUsuario(req.params.id);
  res.status(200);
  res.json({ message: "Usuarios Eliminado." });
});

module.exports = router;
