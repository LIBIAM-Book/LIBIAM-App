const { pool } = require('./dbHelper.js');

/*** MySQL query for setting isolation level to READ COMMITED for avoiding potential data race ***/

// await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
// console.log('Finished setting the isolation level to read committed');

module.exports = {
  getUser: async (req, res) => {
    res.send('Successfully reached GET User endpoint');
  },
  registerUser: async (req, res) => {
    if (req.body) {
      const { first_name, last_name, email, password } = req.body;
      const userTableData = [email, password, email, email];
      const userProfileData = [last_name, first_name, email, email, email];
      
      await pool.getConnection(async (err, connection) => {
        console.log('Pool connection acquired')

        if (err) {
          console.log(err);
          pool.releaseConnection(conn);
          res.status(400).send(err)
          
        } else {
          let userIdQuery;
          const conn = connection.promise();
          console.log('Connection promisified');

          await conn.beginTransaction();
          console.log('Begin transaction');

          await conn
            .execute('INSERT INTO user_t (user_name, password, created_by, updated_by) VALUES(?,?,?,?)', userTableData)
            .then(async (data) => {
              console.log('First query executed')
              
              userIdQuery = await conn.execute(`SELECT LAST_INSERT_ID()`);
              const userId = userIdQuery[0][0]['LAST_INSERT_ID()'];
              console.log('Retrieved user id:', userId)
    
              await conn.execute('INSERT INTO user_profile_t (user_id, last_name, first_name, email, created_by, updated_by) VALUES (?,?,?,?,?,?)', [userId, ...userProfileData]);
              console.log('Second query executed')
    
              await conn.commit();
              console.log('Transaction commited')
    
              const [rows,] = await conn.execute(`SELECT * FROM user_t WHERE id='${userId}'`);
              console.log('Displaying recently added data:', rows[0])
    
              pool.releaseConnection(conn);
              return res.status(202).send(rows[0])
            })
            .catch(err => {
              conn.rollback(() => {
                throw err;
              })
              console.log('ROLLBACK transaction')
              console.log(err.message)
              pool.releaseConnection(conn);

              if (err.message.includes('Duplicate')) {
                return res.status(409).send(err.message)
              } else {
                return res.status(500).send('unknown error occured')
              }
            });
        }
      })
    } else {
      res.status(400).send('QUERY PARAMETER IS MISSING');
    }
  },
  updateUser: async (req, res) => {
    console.log(req.query);
    res.send(req.query);
  },
  authenticateUser: async (req, res) => {
    res.send('Successfully reached POST Auth endpoint');
  },
  getBooks: async (req, res) => {
    res.send('Successfully reached GET Books endpoint');
  },
  personalizeBook: async (req, res) => {
    res.send(req.query);
  },
  generateBook: async (req, res) => {
    res.send(req.query);
  },
  getOrders: async (req, res) => {
    res.send('Successfully reached GET Orders endpoint');
  },
};
