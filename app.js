'use strict';

const debug = require('debug');
const debugInfo = debug('module:info');
setInterval(() => {
  // 標準表示
  debugInfo('some information.');
}, 1000);
// エラーの表示
const debugError = debug('module:error');
setInterval(() => {
  debugError('some error.');
}, 1000);


// いろいなライブラリを読込んで
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

// ルータを読込む
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();

// テンプレートエンジンにpugを指定して
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// ログを出す設定している
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// アクセスがあったら、ルータに処理を渡す
app.use('/', indexRouter);
app.use('/users', usersRouter);

// ページがなかったら404を返す
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
