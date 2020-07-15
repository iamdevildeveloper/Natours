const catchAsync = require('./../utlis/catchAsync');
const AppError = require('./../utlis/appError');
const APIFeatures = require('./../utlis/apiFeatures');

exports.getAll = (Model) =>
  catchAsync(async (req, res) => {
    let filter = req.params.tourId;
    if (req.params.tourId) filter = { tour: req.params.tourId }; // (Hack for reviews);

    const featurs = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limit()
      .pagination();

    const docs = await featurs.query;
    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: {
        docs,
      },
    });
  });

exports.getOne = (Model, popOpt) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOpt) query.populate(popOpt);
    const doc = await query;

    if (!doc) {
      return next(new AppError(`No doc found with ${req.params.id} ID`, 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

exports.create = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        newDoc,
      },
    });
  });

exports.update = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError(`No doc found with ${req.params.id} ID`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

exports.delete = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError(`No doc found with ${req.params.id} ID`, 404));
    }
    res.status(204).json({
      status: 'success',
    });
  });
