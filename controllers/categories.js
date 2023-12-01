function Controller(repository) {
  return {
    findCategories: async () => {
      return await repository.getAll()
    },
    findCategoriesById: async (id) => {
      return await repository.getById(id)
    },
    addCategory: async (name) => {
      await repository.create({
        name: name,
      })
    },
    updateCategory: async (id, name) => {
      await repository.update(id, {
        name: name,
      })
    },
    deleteCategory: async (id) => {
      await repository.delete(id)
    },
  }
}

module.exports = Controller
