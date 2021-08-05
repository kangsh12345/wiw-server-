const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.post('/register', isNotLoggedIn, async (req, res, next) => {
    console.log(req.body);
    const { user_id, name, student_id, password, belong } = req.body;
    console.log(user_id, name, student_id, belong);
    try {
      const hash = await bcrypt.hash(password, 12);
      await User.create({
        user_id,
        name,
        student_id,
        password: hash,
        belong,
      });
      return res.send({result: 'OK'});
    } catch (error) {
      console.error(error);
      return next(error);
    }
  });

  router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
      if (authError) {
        console.error(authError);
        return next(authError);
      }
      if (!user) {
        return res.send({result: info.message});
      }
      return req.login(user, (loginError) => {
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }
        //세션 쿠키를 브라우저로 보내줌이 숨겨져있음
        return res.send({result: "OK"});
      });
    })(req, res, next);
  });

  router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
  });

module.exports = router;