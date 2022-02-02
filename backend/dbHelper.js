const mysql      = require('mysql2/promise');

const userPool = mysql.createPool({
  host     : process.env.MYSQL_HOST,
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASSWORD,
  database : 'users'
});

const bookPool = mysql.createPool({
  host     : process.env.MYSQL_HOST,
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASSWORD,
  database : 'books'
});

module.exports = {
  testConnection: async () => {
    await userPool.getConnection(async (err, connection) => {
      if (err) throw err;
    
      connection.release();
      console.log('Successfully connected to Database')
    })
  },
  queryDB: async (q, db, params, callback) => {
    let pool;

    if (db === 'users') {
      pool = userPool;
    } else if (db === 'books') {
      pool = bookPool;
    } else {
      return 'INVALID DATABASE SELECTED';
    }

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