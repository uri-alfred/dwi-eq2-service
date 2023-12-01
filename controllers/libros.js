function ControllerLibro(repository) {
  return {
    obtenerLibros: async () => {
      try {
        const results = await repository.getAll()
        return results
      } catch (error) {
        console.error("Error obtaining libros:", error)
        throw error
      }
    },

    obtenerLibroPorId: async (id) => {
      try {
        const results = repository.getById(id)
        return results
      } catch (error) {
        console.error("Error obtaining libro by id:", error)
        throw error
      }
    },

    agregarLibro: async (params) => {
      try {
        return await repository.create(params)
      } catch (error) {
        console.error("Error adding libro:", error)
        throw error
      }
    },

    actualizarLibro: async (params) => {
      try {
        return await repository.updateById(params.id, params)
      } catch (error) {
        console.error("Error updating libro:", error)
        throw error
      }
    },

    eliminarLibro: async (id) => {
      try {
        return await repository.deleteById(id)
      } catch (error) {
        console.error("Error deleting libro:", error)
        throw error
      }
    },
  }
}

module.exports = ControllerLibro
