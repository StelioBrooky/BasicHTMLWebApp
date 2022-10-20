const express = require('express');
const router = express.Router();
const controller = require('../controller/controller.js');


router.get('/', controller.getIndex);

router.get('/addPage', controller.getAddPage);

router.post('/addPage', controller.postAddPage);

module.exports = router;