require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');

var app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shopmeoluoiv2', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Kết nối MongoDB thành công!'))
.catch(err => console.error('Lỗi kết nối MongoDB:', err));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Clear template cache (Jade/Pug) - **THÊM ĐOẠN CODE NÀY SAU `app.set('view engine', 'jade');`**
app.get('view cache'); // Check if view cache is enabled (should return true in production, false in development)
app.set('view cache', false); // Force disable view cache for development (or try clearing if it's true)


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware for cart management
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;