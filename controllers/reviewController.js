const Review = require('./../models/reviewModel');
const catchAsync = require('./../utlis/catchAsync');
const AppError = require('./../utlis/appError');
const factory = require('./handlerFactory');

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReview = factory.getAll(Review);
exports.getOneReview = factory.getOne(Review);
exports.createReview = factory.create(Review);
exports.updateReview = factory.update(Review);
exports.deleteReview = factory.delete(Review);
