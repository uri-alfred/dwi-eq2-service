const bcrypt = require("bcrypt")

function ControllerUsuario(repository) {
  return {
    obtenerUsuario: async () => {
      try {
        const results = repository.getAll()
        return results
      } catch (error) {
        console.error("Error obtaining usuarios:", error)
        throw error
      }
    },

    obtenerUsuarioPorId: async (id) => {
      try {
        const results = repository.getById(id)
        return results
      } catch (error) {
        console.error("Error obtaining usuario by id:", error)
        throw error
      }
    },
    obtenerUsuarioPorEmail: async (email) => {
      return await repository.getByEmail(email);
    },
    validarLoginUsuario: async (email, myPlainPassword) => {
      try {
        const user = await repository.getByEmail(email)
        if (!user) return false

        const result = await bcrypt.compare(myPlainPassword, user.password)
        return result
      } catch (error) {
        console.error("Error validating login:", error)
        throw error
      }
    },

    agregarUsuario: async (email, myPlainPassword, nombre, apellido) => {
      try {
        const existsUsuario = await repository.getByEmail(email)
        if (existsUsuario) {
          console.error("Error adding usuario: Usuario already exists")
          return false
        } else {
          await repository.create(email, myPlainPassword, nombre, apellido)
          return true
        }
      } catch (error) {
        console.error("Error adding usuario:", error)
        throw error
      }
    },

    actualizarUsuario: async (params) => {
      try {
        return await repository.updateById(params.id, params)
      } catch (error) {
        console.error("Error updating usuario:", error)
        throw error
      }
    },

    eliminarUsuario: async (id) => {
      try {
        return await repository.deleteById(id)
      } catch (error) {
        console.error("Error deleting usuario:", error)
        throw error
      }
    },
  }
}

module.exports = ControllerUsuario
