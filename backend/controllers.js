const dbHelper = require('./dbHelper.js');

const registrationQ = `INSERT INTO test (name, username, email, password) VALUES (?,?,?,?)`;

module.exports = {
  getUser: async (req, res) => {
    res.send('Successfully reached GET User endpoint');
  },
  registerUser: async (req, res) => {
    console.log(req.query);

    if (req.query) {
      const { name, username, email, password } = req.query;
      const userData = [name, username, email, password];

      await dbHelper.queryDB(registrationQ, 'users', userData);

      res.send('REGISTERED');
    } else {
      res.send('QUERY PARAMETER IS MISSING');
    }
  },
  updateUser: async (req, res) => {
    console.log(req.query);
    res.send(req.query);
  },
  authenticateUser: async (req, res) => {
    res.send(req.query);
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
