const connection = require("../db")

const createCategoriesTable = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255)
    )
  `

  return connection
    .promise()
    .query(createTableQuery)
    .then(([results]) => {
      console.log("Categories table created or already exists:", results)
    })
    .catch((error) => {
      console.error("Error creating Categories table:", error)
    })
}

createCategoriesTable()

const Category = {
  create: async (name) => {
    const insertQuery = "INSERT INTO categories (name) VALUES (?)"
    await connection.promise().query(insertQuery, [name])
  },

  findAll: async () => {
    const selectQuery = "SELECT * FROM categories"
    const [results] = await connection.promise().query(selectQuery)
    return results
  },

  findByPk: async (id) => {
    const selectQuery = "SELECT * FROM categories WHERE id = ?"
    const [results] = await connection.promise().query(selectQuery, [id])
    return results[0]
  },

  update: async (id, category) => {
    const updateQuery = "UPDATE categories SET name = ? WHERE id = ?"
    return connection
      .promise()
      .query(updateQuery, [category.name, id])
  },

  destroy: async (id) => {
    const deleteQuery = "DELETE FROM categories WHERE id = ?"
    return connection.promise().query(deleteQuery, [id])
  },
  findByName: async (name) => {
    const selectQuery = "SELECT * FROM categories WHERE name = ?"
    const [results] = await connection.promise().query(selectQuery, [name])
    return results[0]
  },
}

module.exports = Category
