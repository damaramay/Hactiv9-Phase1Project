const express = require('express')
const router = express.Router()
const Controller = require('../controllers')

router.get('/', Controller.home);
router.get('/home', Controller.home);
router.get('/home/admin', Controller.home);
router.get('/home/user', Controller.home);
router.get('/login', Controller.home);
router.get('/register', Controller.home);
router.get('/profile', Controller.home);
router.get('/seeAllCourse', Controller.home);
router.get('/seeAllCourse/admin', Controller.home);
router.get('/seeAllCourse/user', Controller.home);
router.get('/contactUs', Controller.home);
//selebihnya bisa dibuat di bawah



module.exports = router;