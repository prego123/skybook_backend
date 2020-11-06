const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const helmet = require('helmet');
const path = require('path');
// const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const cors = require('cors');
// const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
// const Sentry = require('@sentry/node');
// const { SitemapStream, streamToPromise } = require('sitemap');
// const { createGzip } = require('zlib');

// initalizing app
const app = express();
app.use(cors());

// securing express
app.use(helmet());

// for environment files
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: './env/.env.production' });
} else {
  dotenv.config({ path: './env/.env' });
}

const PORT = process.env.PORT || 5000;
const mongoDbUrl = process.env.mongoDbUrl;

const authRoute = require('./src/routes/v1/auth');
const promotorRoute = require('./src/routes/v1/promotor');
const searchRoute = require('./src/routes/v1/search');

//connnecting mongoDB server
mongoose
  .connect(mongoDbUrl, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    if (result) {
      //if all goes right then listing to the server
      app.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`server is running at ${PORT}`);
      });
    }
  })

  .catch((err) => {
    throw err;
  });

//logging logs
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('tiny'));
} else {
  app.use(morgan('dev'));
}

//initiallizaing passport
app.use(passport.initialize());
require('./src/utils/passportAuth')(passport);

//initiallizaing passport
app.use(passport.initialize());
require('./src/utils/passportAuth')(passport);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// API serving routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/promotor', promotorRoute);
app.use('/api/v1/search', searchRoute);

// WEB serving routes
app.use(express.static(path.join(__dirname, 'client')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

// FOR REACT JS APP
// //if the app is in production then serve files also
// if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
//   app.use(express.static(path.join(__dirname, 'client')));
//   app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'index.html'));
//   });
// }
