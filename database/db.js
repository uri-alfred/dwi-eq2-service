const mysql = require("mysql2")

const connection = mysql.createConnection(process.env.DATABASE_URL)

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to Db")
    return
  }
  console.log("Connection established")
})

module.exports = connection
