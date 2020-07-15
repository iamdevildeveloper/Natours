const express = require('express');
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');
const bookingController = require('./../controllers/bookingController');

const router = express.Router();
router.use(authController.isLoggedIn);

// Routes
router
  .route('/')
  .get(bookingController.createBookingCheckout, viewsController.getOverview);
router.route('/tour/:slug').get(viewsController.getTour);
router.route('/login').get(viewsController.login);
router.route('/me').get(authController.protect, viewsController.getAccount);
router
  .route('/my-tours')
  .get(authController.protect, viewsController.getMyTours);

module.exports = router;
