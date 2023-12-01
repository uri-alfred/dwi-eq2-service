const Usuario = require("./models/Usuarios")

function RepositorioUsuarios() {
  return {
    create: async (usuario, myPlainPassword) => {
      await Usuario.addUsuario(usuario, myPlainPassword)
    },
    getAll: async () => {
      return await Usuario.findAllUsuarios()
    },
    getById: async (id) => {
      return await Usuario.findUsuarioById(id, {
        attributes: ["user_id", "email"],
      })
    },
    getByEmail: async (email) => {
      return await Usuario.findUsuarioByEmail({
        where: {
          email: email,
        },
        attributes: ["user_id", "email"],
      })
    },
    updateById: async (id, usuario) => {
      return Usuario.updateUsuarioById(usuario, {
        where: {
          user_id: id,
        },
      })
    },
    deleteById: async (id) => {
      return Usuario.deleteUsuarioById({
        where: {
          user_id: id,
        },
      })
    },
  }
}

module.exports = RepositorioUsuarios
