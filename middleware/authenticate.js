const bcrypt = require('bcrypt');

const { User } = require("../models/usercredentials");

module.exports = async function (req, res, next) {
    try {
        const err = Error("Incorrect email or password!");

        const user = await User.findOne({ email: req.body.email });
        if (!user) throw err;
    
        const result = await bcrypt.compare(req.body.password, user.password);
        if (!result) throw err;
        
        req.user = user;
        next();
    } catch (err) {
        return res.status(400).send(err.message);
    }
}
