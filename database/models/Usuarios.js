const connection = require("../db")
const bcrypt = require("bcrypt")

const createUsuarioTable = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS usuarios (
      user_id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) UNIQUE,
      password VARCHAR(255),
      nombre VARCHAR(255),
      apellido VARCHAR(255)
    )
  `

  return connection
    .promise()
    .query(createTableQuery)
    .then(([results]) => {
      console.log("Usuarios table created or already exists:", results)
    })
    .catch((error) => {
      console.error("Error creating Usuarios table:", error)
    })
}

createUsuarioTable()

const addUsuario = async (email, myPlainPassword,nombre, apellido) => {
  try {
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(myPlainPassword, salt)

    const insertQuery = "INSERT INTO usuarios (email, password, nombre, apellido) VALUES (?, ?, ?, ?)"
    await connection.promise().query(insertQuery, [email, hash, nombre, apellido])
  } catch (error) {
    console.error("Error adding usuario:", error)
    throw error
  }
}

const findAllUsuarios = async () => {
  const selectQuery = "SELECT * FROM usuarios"
  const [results] = await connection.promise().query(selectQuery)
  return results
}

const findUsuarioById = async (id) => {
  const selectQuery = "SELECT user_id, email, nombre, apellido FROM usuarios WHERE user_id = ?"
  const [results] = await connection.promise().query(selectQuery, [id])
  return results[0]
}

const findUsuarioByEmail = async (email) => {
  const selectQuery = "SELECT user_id, email, password FROM usuarios WHERE email = ?"
  const [results] = await connection.promise().query(selectQuery, [email])
  return results[0]
}

const updateUsuarioById = async (id, usuario) => {
  const { email, nombre, apellido } = usuario
  const updateQuery =
    "UPDATE usuarios SET email = ?, nombre = ?, apellido = ? WHERE user_id = ?"
  await connection.promise().query(updateQuery, [email, nombre, apellido, id])
}

const deleteUsuarioById = async (id) => {
  const deleteQuery = "DELETE FROM usuarios WHERE user_id = ?"
  await connection.promise().query(deleteQuery, [id])
}

module.exports = {
  addUsuario,
  findAllUsuarios,
  findUsuarioById,
  findUsuarioByEmail,
  updateUsuarioById,
  deleteUsuarioById,
  // If you have specific operations related to usuarios, you can define them here.
}
