const router = express.Router();
const user = require('../action/user');

router.route("/login").post(user.login);
module.exports = router;
