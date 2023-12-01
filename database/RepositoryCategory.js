const Category = require("./models/Category")

function RepositoryCategory() {
  return {
    create: async (category) => {
      await Category.create(category)
    },

    getAll: async () => {
      return await Category.findAll()
    },

    getById: async (id) => {
      return await Category.findByPk(id)
    },

    updateById: async (id, category) => {
      return await Category.update(category, { where: { id } })
    },

    deleteById: async (id) => {
      return await Category.destroy({ where: { id } })
    },
    getByName: async (name) => {
      return await Category.findByName(name)
    },
  }
}

module.exports = RepositoryCategory
