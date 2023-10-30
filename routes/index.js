const router = require("express").Router();
const userRoutes = require("../routes/user");
const reflectionRoutes = require("../routes/reflection");
const auth = require("../middlewares/auth").authentication;

router.use('/users', userRoutes);
router.use('/reflections', auth, reflectionRoutes);

module.exports = router;