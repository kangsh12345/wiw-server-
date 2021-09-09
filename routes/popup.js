const express = require('express');

const { isLoggedIn} = require('./middlewares');
const E4F = require('../models/E4F');
const User = require('../models/user');

const router = express.Router();

router.get('/people', isLoggedIn, async function(req, res, next){
  const data9443 = await E4F.findAndCountAll({where: {classroom: '9443'}});
  const data9425 = await E4F.findAndCountAll({where: {classroom: '9425'}});
  const data9428 = await E4F.findAndCountAll({where: {classroom: '9428'}});
  const data9429 = await E4F.findAndCountAll({where: {classroom: '9429'}});

  try {
    const data = {data9443, data9425, data9428, data9429};

    return res.send(data);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post('/userdata', isLoggedIn, async function(req,res,next){
  const {classroom} = req.body;

  const userData = await E4F.findAll({where: {classroom: classroom}});

  try {
    return res.send({userData});
  } catch (error) {
    console.error(error);
    return next(error);
  }
})

router.post('/in', isLoggedIn, async function(req, res, next) {
    const { info, name, user_id, classroom, active } = req.body;
    const data = await E4F.findAll({where: {user_id: user_id}});
    console.log(user_id);
    console.log(data[0]);
    console.log(active);
    try {
      if(data[0]!==undefined){
        await E4F.destroy({where: {user_id: user_id}});
      }
      await E4F.create({
          name,
          info,
          user_id,
          classroom,
          active
      });
      await User.update(
        {
          active: true,
          classroom: classroom,
        },
        {where: {user_id: user_id}}
      );
      return res.send({result: 'in'});
    } catch (error) {
      console.error(error);
      return next(error);
    }(req, res, next);
});

router.post('/out', isLoggedIn, async (req, res) => {
    const { user_id, classroom } = req.body;
    console.log(user_id);
    try {
        await E4F.destroy({where: {user_id: user_id}});
        await User.update(
          {
            active: false,
            classroom: classroom,
          },
          {where: {user_id: user_id}}
        );
        return res.send({result: 'out'});
      } catch (error) {
        console.error(error);
        return next(error);
      }
  });

  router.post('/text', isLoggedIn, async(req,res)=>{
    const {user_id, text} = req.body;

    try {
      await E4F.update(
        {
          text: text,
        },
        {where: {user_id: user_id}}
      );
      return res.send({result: 'textin'});
    } catch (error) {
      console.error(error);
      return next(error);
    }
  })


module.exports = router;