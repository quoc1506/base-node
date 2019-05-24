const helper = require("../helper")
const i18n = require("i18n")
const jwt = require('jsonwebtoken');

async function login(req, res, next) {
  try {
    if (req.body.fbToken) {
      const fb = require('../facebook');
      const userFB = await fb.search(req, req.body.fbToken);
      if (!userFB) {
        return res.json(helper.responseError(i18n.__("FB_ERROR")))
      }
      if (userFB.error) {
        return res.json(helper.responseError(userFB.error.message));
      }
      let user = await User.findOneWhere({fbId: userFB.id})
      if (!user) {
        let photos = await fb.photos(req, req.body.fbToken, userFB.id);
        // do something with user photos ....
        user = await User.create({
          name: userFB.name,
          fbId: userFB.id,
          avatar: userFB.picture.data.url
        })
      }

      user = user.toJSON()
      user.token = jwt.sign(user, process.env.jwt_secret, {expiresIn: process.env.jwt_expires});
      return res.json(helper.responseSuccess(user))
    } else
      helper.responseError()
  } catch (err) {
    next(err);
    res.json(helper.responseError(err.message))
  }
}

module.exports = {
  login
};

