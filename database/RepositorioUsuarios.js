const Usuario = require("./models/Usuarios")

function RepositorioUsuarios() {
  return {
    create: async (usuario, myPlainPassword, nombre, apellido) => {
      await Usuario.addUsuario(usuario, myPlainPassword, nombre, apellido)
    },
    getAll: async () => {
      return await Usuario.findAllUsuarios()
    },
    getById: async (id) => {
      return await Usuario.findUsuarioById(id)
    },
    getByEmail: async (email) => {
      return await Usuario.findUsuarioByEmail(email)
    },
    updateById: async (id, usuario) => {
      return Usuario.updateUsuarioById(id, usuario)
    },
    deleteById: async (id) => {
      return Usuario.deleteUsuarioById(id)
    },
  }
}

module.exports = RepositorioUsuarios
