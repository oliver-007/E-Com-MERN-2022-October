// ***** env config  *****
require("dotenv").config();
// const STRIPE_KEY = process.env.STRIPE_KEY;
const STRIPE_KEY = process.env.KOBITA_STRIPE_KEY;
const CLIENT = process.env.CLIENT;
const stripe = require("stripe")(STRIPE_KEY);
const OrderModel = require("../model/order.model");
const ProductModel = require("../model/product.model");
const UserModel = require("../model/user.model");
// const ENDPOINT_SECRET = process.env.ENDPOINT_SECRET;
const ENDPOINT_SECRET = process.env.KOBITA_ENDPOINT_SECRET;

class PaymentController {
  // ****** stripe payment process   *****
  async paymentProcess(req, res) {
    const { cart, id } = req.body;

    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found !" });
    }

    // ******* order data  *******
    const orderData = cart.map((item) => {
      return {
        _id: item._id,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        userId: user._id,
      };
    });

    //  ***** create customer in stripe  ****
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: {
        cart: JSON.stringify(orderData),
      },
    });

    const session = await stripe.checkout.sessions.create({
      shipping_address_collection: { allowed_countries: ["BD", "IN", "PK"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "usd" },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
      ],

      line_items: cart.map((item) => {
        const percentage = item.discount / 100;
        let actualPrice = item.price - item.price * percentage;
        actualPrice = parseFloat(actualPrice);
        actualPrice = actualPrice * 100;
        actualPrice = Math.round(actualPrice);

        return {
          price_data: {
            currency: "usd",
            product_data: { name: item.title },
            unit_amount_decimal: actualPrice,
          },
          quantity: item.quantity,
        };
      }),
      customer: customer.id,
      mode: "payment",
      success_url: `${CLIENT}/user?session_id={CHECKOUT_SESSION_ID} `,
      cancel_url: `${CLIENT}/cart`,
    });

    res.json({ url: session.url });
  }
  // ******** webhook checkout Session ********
  async checkOutSession(req, res) {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.rawBody, sig, ENDPOINT_SECRET);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log("Payment_intent : ", paymentIntent);
        // Then define and call a function to handle the event payment_intent.succeeded
        break;

      case "checkout.session.completed":
        const data = event.data.object;
        let customer = await stripe.customers.retrieve(data.customer);
        customer = JSON.parse(customer?.metadata?.cart);

        customer.forEach(async (ctr) => {
          try {
            // ***** create Order Model ****
            await OrderModel.create({
              productId: ctr._id,
              userId: ctr.userId,
              size: ctr.size,
              color: ctr.color,
              quantities: ctr.quantity,
              address: data.customer_details.address,
            });

            // ****** Stock quantity calculation *****
            const product = await ProductModel.findById(ctr._id);
            if (product) {
              let stock = product.stock - ctr.quantity;
              if (stock < 0) {
                stock = 0;
              }
              await ProductModel.findByIdAndUpdate(
                ctr._id,
                { stock },
                { new: true }
              );
            }
          } catch (error) {
            console.log(error.message);
            return res.status(500).json("Server internal Error ");
          }
        });
        break;

      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }

    // Return a 200 res to acknowledge receipt of the event
    res.send();
  }
  // ******* payment verify func  *******
  async paymentVerify(req, res) {
    const { id } = req.params;
    try {
      const session = await stripe.checkout.sessions.retrieve(id);
      return res.status(200).json({
        msg: "Payment verification Success ",
        status: session.payment_status,
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
module.exports = new PaymentController();
