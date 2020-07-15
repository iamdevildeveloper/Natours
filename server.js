const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require(`${__dirname}/app`);

const port = process.env.PORT || 7777;

const DB = process.env.DATABASE.replace('<password>', process.env.DBPASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(`Database Successfully connected !!`);
  });

const server = app.listen(port, () => {
  console.log(
    `App running on port ${port} and environment is ${process.env.NODE_ENV}`
  );
});

process.on('unhandledRejection', (err) => {
  console.log('Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
