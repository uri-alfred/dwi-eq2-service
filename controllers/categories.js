function ControllerCategory(repository) {
  return {
    findCategories: async () => {
      try {
        const results = await repository.getAll()
        return results
      } catch (error) {
        console.error("Error finding categories:", error)
        throw error
      }
    },

    findCategoryById: async (id) => {
      try {
        const results = await repository.getById(id)
        return results
      } catch (error) {
        console.error("Error finding category by id:", error)
        throw error
      }
    },

    addCategory: async (name) => {
      try {
        const existsCategory = await repository.getByName(name)
        if (existsCategory) {
          console.error("Error adding category: Category already exists")
          return false
        } else {
          await repository.create(name)
          return true
        }
      } catch (error) {
        console.error("Error adding category:", error)
        throw error
      }
    },

    updateCategory: async (id, name) => {
      try {
        await repository.updateById(id, { name })
      } catch (error) {
        console.error("Error updating category:", error)
        throw error
      }
    },

    deleteCategory: async (id) => {
      try {
        await repository.deleteById(id)
      } catch (error) {
        console.error("Error deleting category:", error)
        throw error
      }
    },
  }
}

module.exports = ControllerCategory
