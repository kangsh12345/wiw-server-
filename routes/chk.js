const express = require('express');
const router = express.Router();
const User = require('../models/user');

/* GET users listing. */
router.post('/', async function(req, res, next) {
    const user_id = req.body.ID;

    const exUser = await User.findOne({ where: { user_id } });
    if (exUser) {
        return res.send({Result : 'Exist'});
    }else {
        return res.send({Result : 'OK'});
    }
});

module.exports = router;
