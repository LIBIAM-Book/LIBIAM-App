const GridRowsColumns = require('autoprefixer/lib/hacks/grid-rows-columns');
const { pool } = require('./dbHelper.js');
//const hashing = require(path.join(__dirname, 'backend', 'hashing.js'));
/*** MySQL query for setting isolation level to READ COMMITED for avoiding potential data race ***/

// await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
// console.log('Finished setting the isolation level to read committed');
const salt = process.env.SALT;

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
          
          const sha256 = require('sha256');
          const hashedPw = sha256(email + password + salt);

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

    if (req.body) {

      const {email, password } = req.body;

      console.log('user auth started')
      await pool.getConnection(async (err, connection) => {
        console.log('Pool connection acquired')
  
        if (err) {
          console.log(err);
          pool.releaseConnection(conn);
          console.log('res.status(400) already');
          res.status(400).send(err)
          
        } else {
          let userIdQuery;
          const conn = connection.promise();
          console.log('Connection promisified')
  
          await conn.beginTransaction();
          console.log('Begin transaction')
          const [rows] = await conn.execute('SELECT * FROM user_t WHERE user_name =  ?', [email]);
          
  
          pool.releaseConnection(conn);
          // res.send(rows[0])
          if (Object.keys(rows).length > 0){
            console.log('Found a user! ');
            // found a user. check pw
            const sha256 = require('sha256');
            const hashedPw = sha256(rows[0].user_name + password + salt);

            if (rows[0].password == hashedPw){
              // logged in successfully
              console.log('logged in successfully! ');
              
              return res.status(200).send('logged in successfully');
  
            } else {
              // password not matched
              console.log('password not matched!');
              return res.status(401).send('password not matched');
              // return "your input does not match";
            }
            
          } else {
            // user not exist
            console.log('user not exist!');
            return res.status(200).send('user not exist');
          }
        }
      })
    }
    else {
      res.status(400).send('QUERY PARAMETER IS MISSING');
    }

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
