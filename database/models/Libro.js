const connection = require("../db")

const createLibrosTable = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS libros (
      id INT AUTO_INCREMENT PRIMARY KEY,
      titulo_lib VARCHAR(255),
      anio_lib INT,
      autor_lib VARCHAR(255),
      editorial_lib VARCHAR(255),
      fk_cat INT
    )
  `

  return connection
    .promise()
    .query(createTableQuery)
    .then(([results]) => {
      console.log("Libros table created or already exists:", results)
    })
    .catch((error) => {
      console.error("Error creating Libros table:", error)
    })
}

createLibrosTable()

const Libro = {
  create: async (libro) => {
    const { titulo_lib, anio_lib, autor_lib, editorial_lib, fk_cat } = libro
    const insertQuery =
      "INSERT INTO libros (titulo_lib, anio_lib, autor_lib, editorial_lib, fk_cat) VALUES (?, ?, ?, ?, ?)"
    await connection
      .promise()
      .query(insertQuery, [
        titulo_lib,
        anio_lib,
        autor_lib,
        editorial_lib,
        fk_cat,
      ])
  },

  findAll: async () => {
    const selectQuery = "SELECT * FROM libros"
    const [results] = await connection.promise().query(selectQuery)
    return results
  },

  findByPk: async (id) => {
    const selectQuery = "SELECT * FROM libros WHERE id = ?"
    const [results] = await connection.promise().query(selectQuery, [id])
    return results[0]
  },

  update: async (libro, conditions) => {
    const { titulo_lib, anio_lib, autor_lib, editorial_lib, fk_cat } = libro
    const updateQuery =
      "UPDATE libros SET titulo_lib = ?, anio_lib = ?, autor_lib = ?, editorial_lib = ?, fk_cat = ? WHERE id = ?"
    return connection
      .promise()
      .query(updateQuery, [
        titulo_lib,
        anio_lib,
        autor_lib,
        editorial_lib,
        fk_cat,
        conditions.where.id,
      ])
  },

  destroy: async (conditions) => {
    const deleteQuery = "DELETE FROM libros WHERE id = ?"
    return connection.promise().query(deleteQuery, [conditions.where.id])
  },
}

module.exports = Libro
