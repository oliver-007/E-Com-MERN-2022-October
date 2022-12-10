const OrderModel = require("../model/order.model");

class OrdersController {
  // ******** Get Orders  *********
  async getOrders(req, res) {
    const { page } = req.params;
    const perPage = 5;
    const skip = (page - 1) * perPage;
    try {
      const count = await OrderModel.find({}).countDocuments();
      const response = await OrderModel.find({})
        .populate(
          "productId",
          "-colors -sizes -createdAt -updatedAt -stock -image2 -image3 "
        )
        .populate("userId", "-password -admin")
        .skip(skip)
        .limit(perPage)
        .sort({ updatedAt: -1 });
      return res.status(200).json({ orders: response, perPage, count });
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = new OrdersController();
