const router = require("express").Router();
const controller = require("../controllers/reflection.controller");
// const auth = require("../middlewares/auth").authentication;

router.post('/', controller.createReflection)
router.get('/', controller.getAllReflections)
router.put('/:id', controller.updateReflection)
router.delete('/:id', controller.deleteReflection)

module.exports = router 