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
      return await Libro.update(libro, { where: { id } })
    },

    deleteById: async (id) => {
      return await Libro.destroy({ where: { id } })
    },
  }
}

module.exports = RepositoryLibro
