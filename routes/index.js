var express = require('express');
var router = express.Router();
let controllerIndex = require('../controllers/index');

/* GET home page. */
router.get('/', controllerIndex.home);
/* GET Login page. */
//router.get('/log', controllerIndex.login);
//router.get('/reg', controllerIndex.reg);
/* GET Register page. */
//router.post('/reg', controllerIndex.register);
/* GET Log page. */
//router.post('/log', controllerIndex.log);
/* GET Logout page. */
//router.get('/logout', controllerIndex.logout);

module.exports = router;
