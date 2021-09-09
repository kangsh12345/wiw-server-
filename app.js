const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


////////////////
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const chkRouter = require('./routes/chk');
const changeshowRouter = require('./routes/changeShow');
const popupRouter = require('./routes/popup');
///////////////


const session = require('express-session');
const dotenv = require('dotenv');

const passport = require('passport');
const passportConfig = require('./passport');

dotenv.config();

const {sequelize} = require('./models');

const app = express();

// app.set('port', process.env.PORT || 8002);
app.set('port', 8002);

sequelize.sync({force: false})
  .then(()=>{
    console.log('데이터베이스 연결 성공');
  })
  .catch((err)=>{
    console.error(err);
  });
passportConfig();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/chkid', chkRouter);
app.use('/api/show', changeshowRouter);
app.use('/api/popup', popupRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status=404;
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

// app.listen(app.get('port'), ()=>{
//   console.log(app.get('port'), '번 포트에서 대기중');
// });

app.listen(app.get(8002), ()=>{
  console.log(8002, '번 포트에서 대기중');
});


module.exports = app;
