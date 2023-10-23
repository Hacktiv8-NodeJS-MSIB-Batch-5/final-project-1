const router = require("express").Router();
const userRoutes = require("../routes/user");
const reflectionController = require("../controllers/reflection.controller");
const auth = require("../middlewares/auth").authentication;

router.use('/users', userRoutes);
router.post('/reflections', auth, reflectionController.createReflection);

module.exports = router;