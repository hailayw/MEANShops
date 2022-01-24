const express = require("express");
const shopcontroller = require('../controllers/shops-controller');
const itemController = require('../controllers/items-controller');
const router = express.Router();

//CRUD REST API on main the documents
router.route('/shops')
        .post(shopcontroller.addOne)
        .get(shopcontroller.getAll);

router.route('/shops/:shopId')
        .get(shopcontroller.getOne)
        .put(shopcontroller.updateOne)
        .delete(shopcontroller.deleteOne);

//CRUD REST API on sub-documents
router.route('/shops/:shopId/items')
        .post(itemController.addOne)
        .get(itemController.getAll);

router.route('/shops/:shopId/items/:itemId')
        .get(itemController.getOne)
        .put(itemController.updateOne)
        .delete(itemController.deleteOne);

module.exports = router;