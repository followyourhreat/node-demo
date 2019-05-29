var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/member/:username', function(req, res, next) {
  res.send('member:' + req.params.username);
});

module.exports = router;
