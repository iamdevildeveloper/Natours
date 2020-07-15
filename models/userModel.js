const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
// Name, email, photo, password, passwordConfirm;

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'A user must have name'],
      maxlength: [40, 'Name must have below or equal than 40 characters'],
      minlength: [2, 'Name must have above than 2 characters'],
      trim: true,
    },
    email: {
      type: String,
      require: [true, 'A user must have an email'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      require: [true, 'A user must have a password'],
      minlength: [8, 'Name must have above than 8 characters'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      require: [true, 'A user must have a password'],
      validate: {
        // Only works for save
        validator: function (el) {
          return el === this.password;
        },
        message: 'Password and Confirm password are not matching !!',
      },
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'guide', 'admin'],
    },
    photo: { type: String, default: 'default.jpg' },
    passwordChangedAt: Date,
    passResetToken: String,
    passResetTokenExpires: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate
userSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'user',
  localField: '_id',
});

userSchema.pre(/^(findOne|findById)$/, function (next) {
  this.populate({
    path: 'reviews',
  });
  next();
});

userSchema.pre('save', async function (next) {
  // If password not modified
  if (!this.isModified('password')) return next();

  // Hash password
  this.password = await bcrypt.hash(this.password, 12);

  // To not store password confirm in database
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', async function (next) {
  // If password not modified
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (candidatePass, userPass) {
  return await bcrypt.compare(candidatePass, userPass);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000);

    return JWTTimestamp < changedTimeStamp;
  }

  return false;
};

userSchema.methods.generateResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passResetTokenExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
