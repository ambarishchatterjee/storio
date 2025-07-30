const express = require('express')
const authController = require('../controllers/authController')
const upload = require('../helpers/imageUpload')
const { AuthCheck } = require('../middleware/auth')

const router = express.Router()

router.post('/signup', upload.single('profileImage'), authController.signUp)

router.post('/verify-otp', authController.verifyOtp)

router.post('/login', authController.postLogin)


router.get('/logout', authController.logout)
router.get('/me', AuthCheck, authController.logout)


module.exports = router