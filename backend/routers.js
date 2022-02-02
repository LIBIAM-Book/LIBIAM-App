const router = require('express').Router();
const {
  getUser,
  registerUser,
  updateUser,
  authenticateUser,
  getBooks,
  personalizeBook,
  generateBook,
  getOrders,
} = require('./controllers');

router
  .route('/users')
  .get(getUser)
  .post(registerUser)
  .put(updateUser);

router
  .route('/users/auth')
  .post(authenticateUser);

router
  .route('/books')
  .get(getBooks)
  .post(personalizeBook);

router
  .route('/books/magic')
  .post(generateBook);

router
  .route('/orders')
  .get(getOrders);

module.exports = router;