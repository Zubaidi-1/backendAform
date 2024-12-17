const mysql = require("mysql2");

const connection = mysql.createPool({
  host: "34.41.40.244",
  user: "root",
  database: "aform",
  password: "Wolfteam123",
});
connection.getConnection((err, conn) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Successfully connected to the database!");
    conn.release(); // Release the connection back to the pool
  }
});

module.exports = connection.promise();
