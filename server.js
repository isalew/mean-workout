// TODO:40 App: Setup automatic start/stop of Mongo server
// http://antrikshy.com/blog/run-mongodb-automatically-nodejs-project/

// SETUP
// =============================================================================

// Call the packages we need
var express       = require('express');
var app           = express();
var mongoose      = require('mongoose');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');

// CONFIGURATION
// =============================================================================

// config files
var db = require('./config/db');

// connect to database
mongoose.connect(db.url);

mongoose.connection.on('error',function(err){
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// TODO: Favicon not displaying
app.use(favicon(path.join(__dirname, 'public','img','favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // set the static files location

// view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'html');

// MODELS
// =============================================================================

require('./app/models/exercise.model');
require('./app/models/workout.model');

// ROUTES
// =============================================================================

// client routes, to handle front-end angular requests
var routes = require('./app/routes/index.routes');

// server routes, to handle api calls, authentication requests
var exercises = require('./app/routes/exercise.routes');
var workouts = require('./app/routes/workout.routes');
var users = require('./app/routes/user.routes');

// register routes
app.use('/', routes);
app.use('/api/exercises',exercises);
app.use('/api/workouts',workouts);
app.use('/users', users);
app.use('/bower_components',express.static(__dirname + '/bower_components'));

// ERROR HANDLING
// =============================================================================

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// EXPOSE THE APP
// =============================================================================

module.exports = app;
