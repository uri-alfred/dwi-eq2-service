const connection = require("../db")

const createLibrosTable = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS libros (
      id INT AUTO_INCREMENT PRIMARY KEY,
      titulo_lib VARCHAR(255),
      anio_lib INT,
      autor_lib VARCHAR(255),
      editorial_lib VARCHAR(255),
      fk_cat VARCHAR(255)
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
    const { titulo, anio, autor, editorial, cat } = libro
    const insertQuery =
      "INSERT INTO libros (titulo_lib, anio_lib, autor_lib, editorial_lib, fk_cat) VALUES (?, ?, ?, ?, ?)"
    await connection
      .promise()
      .query(insertQuery, [
        titulo,
        anio,
        autor,
        editorial,
        cat,
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

  update: async (id, libro) => {
    const { titulo, anio, autor, editorial, cat } = libro
    const updateQuery =
      "UPDATE libros SET titulo_lib = ?, anio_lib = ?, autor_lib = ?, editorial_lib = ?, fk_cat = ? WHERE id = ?"
    return connection
      .promise()
      .query(updateQuery, [
        titulo,
        anio,
        autor,
        editorial,
        cat,
        id,
      ])
  },

  destroy: async (id) => {
    const deleteQuery = "DELETE FROM libros WHERE id = ?"
    return connection.promise().query(deleteQuery, [id])
  },
}

module.exports = Libro
