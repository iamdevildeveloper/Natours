const express = require('express');
const tourController = require(`${__dirname}/../controllers/tourController`);
const authController = require(`./../controllers/authController`);
const reviewRouter = require(`./../routes/reviewRoutes`);

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

router
  .route('/tour-stats')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    tourController.getTourStats
  );

router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    tourController.getMonthlyPlan
  );
router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithIn);

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    tourController.createTour
  );

router
  .route('/:id')
  .get(tourController.getTourById)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    tourController.uploadTourImages,
    tourController.resizeImages,
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    tourController.deleteTour
  );

module.exports = router;
