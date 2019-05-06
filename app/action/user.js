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
      let data = req.body;
      data.isOnline = true;
      data.refreshToken = randtoken.uid(256);
      if (data.latitude && data.longitude) {
        try {
          data.location = await helper.getLocation(data.latitude, data.longitude);
        } catch (e) {
          log.errorLog(req, e)
        }
      }
      let isNewMember = !user;
      if (user)
        await user.update(data)
      else {
        setCreateData(data, userFB, user);
        user = await User.create(data)
      }
      user = user.toJSON()
      user.token = jwt.sign(user, process.env.jwt_secret, {expiresIn: process.env.jwt_expires});
      SCHEDULE.startJobUserStatus(CONSTANTS.MODEL_SCHEDULE_TYPE.USER_STATUS, user.id)
      if (isNewMember) {
        let photos = await fb.photos(req, req.body.fbToken, userFB.id);
        let len = photos.data.length;
        if (photos && len) {
          var inserts = [];
          for (let i in photos.data) {
            helper.makeUploadFile(req, CONSTANTS.UPLOAD_IMAGE_TYPE.USER, photos.data[i].picture, user.id, len, inserts, res, user, true, userFB.picture.data.url)
          }
        } else if (userFB.picture)
          helper.makeUploadFile(req, CONSTANTS.UPLOAD_IMAGE_TYPE.USER_AVATAR, userFB.picture.data.url, user.id, false, false, res, user)
        else
          return res.json(helper.responseSuccess(user))
      } else
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

