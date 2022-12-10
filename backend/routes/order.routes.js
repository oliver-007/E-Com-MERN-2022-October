const OrdersController = require("../controllers/OrdersController");
const Authorization = require("../services/Authorization");

const router = require("express").Router();

router.get(
  "/orders/:page",
  Authorization.authorized,
  OrdersController.getOrders
);
module.exports = router;
