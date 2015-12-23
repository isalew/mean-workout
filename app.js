<!-- server.js -->

// TODO:40 App: Setup automatic start/stop of Mongo server
// http://antrikshy.com/blog/run-mongodb-automatically-nodejs-project/

// set up ====================================================================================
var express       = require('express');
var app           = express();
var mongoose      = require('mongoose');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');

// configuration =============================================================================

mongoose.connect('mongodb://localhost/workout');

mongoose.connection.on('error',function(err){
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// models ====================================================================================

require('./models/Exercise');
require('./models/Workout');

// routes ====================================================================================

var routes = require('./routes/index');
var exercises = require('./routes/exercises');
var workouts = require('./routes/workouts');
var users = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api/exercises',exercises);
app.use('/api/workouts',workouts);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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

module.exports = app;
