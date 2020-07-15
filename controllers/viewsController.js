const Tours = require('./../models/tourModel');
const Booking = require('./../models/bookingModel');
const catchAsync = require('./../utlis/catchAsync');
const AppError = require('./../utlis/appError');
const Tour = require('./../models/tourModel');

exports.getOverview = catchAsync(async (req, res, next) => {
  // Get tour data
  const tours = await Tours.find();
  // Build template

  // Render template
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tours.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    select: 'review rating user',
  });
  if (!tour) {
    return next(new AppError('There is no tour with that name', 404));
  }
  // console.log(tour.reviews);
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});

exports.login = (req, res) => {
  res.status(200).render('login', {
    title: 'Login',
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

exports.getMyTours = async (req, res, next) => {
  // Get all bookings
  const booking = await Booking.find({ user: req.user.id });

  // Find tours with the returned IDs
  const tourIDs = booking.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours,
  });
};
