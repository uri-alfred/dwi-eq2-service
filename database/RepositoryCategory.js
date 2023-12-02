const Category = require("./models/Category")

function RepositoryCategory() {
  return {
    create: async (name) => {
      await Category.create(name)
    },

    getAll: async () => {
      return await Category.findAll()
    },

    getById: async (id) => {
      return await Category.findByPk(id)
    },

    updateById: async (id, category) => {
      return await Category.update(id, category)
    },

    deleteById: async (id) => {
      return await Category.destroy( id )
    },
    getByName: async (name) => {
      return await Category.findByName(name)
    },
  }
}

module.exports = RepositoryCategory
