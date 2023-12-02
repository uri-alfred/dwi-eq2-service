const Libro = require("./models/Libro")

function RepositoryLibro() {
  return {
    create: async (libro) => {
      await Libro.create(libro)
    },

    getAll: async () => {
      return await Libro.findAll()
    },

    getById: async (id) => {
      return await Libro.findByPk(id)
    },

    updateById: async (id, libro) => {
      return await Libro.update(id, libro)
    },

    deleteById: async (id) => {
      return await Libro.destroy(id)
    },
  }
}

module.exports = RepositoryLibro
