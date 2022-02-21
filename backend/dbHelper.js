const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host     : process.env.MYSQL_HOST,
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASSWORD,
  database : 'books',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = {
  pool: pool.pool,
  testConnection: async () => {
    await pool.getConnection(async (err, connection) => {
      if (err) throw err;
    
      connection.release();
      console.log('Successfully connected to Database')
    })
  },
  queryDB: async (q, db, params, callback) => {
    pool.getConnection(async (err, connection) => {
      if (err) throw err;

      return await connection.query(q, params, (error, results, fields) => {
        connection.release();
        
        if (results) {
          return results;
        }

        if (error) throw error;
      })
    })
  }
}