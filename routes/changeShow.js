const express = require('express');

const { isLoggedIn} = require('./middlewares');
const User = require('../models/user');
const E4F = require('../models/E4F');

const router = express.Router();

router.post('/', isLoggedIn, async function(req, res, next) {
    

    try{
        await User.update(
            {show: req.body.show},
            {where: {user_id: req.body.user_id}}
        );

        if(req.body.show==='true'){
            await E4F.update(
                {
                  info: req.body.info,
                  name: req.body.name,
                  active: true,
                },
                {where: {user_id: req.body.user_id}}
              );
        }
        else if(req.body.show==='false'){
            await E4F.update(
                {
                  info: "비공개",
                  name: "",
                  text: "",
                  active: false,
                },
                {where: {user_id: req.body.user_id}}
              );
        }

        
        // const user = await User.findOne({where: {user_id: req.body.user_id}});

        return res.send({
            result : "공개 비공개 변경완료",
            // UserInfo: {
            //     user_id: user.user_id,
            //     name: user.name,
            //     major: user.major,
            //     student_id: user.student_id,
            //     belong: user.belong,
            //     show: user.show,
            // }
        });
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

module.exports = router;