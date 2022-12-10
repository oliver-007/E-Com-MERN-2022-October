const { urlencoded, json } = require("express");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 9001;
const dbConnect = require("./config/db");
const userRoutes = require("./routes/user.routes");
const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");
const paymentRoutes = require("./routes/payment.routes");
const orderRoutes = require("./routes/order.routes");

dbConnect();

app.use(cors());
app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ mess: "welcome to E-Com" });
});

// *****  Stripe Webhook *****
app.post(
  "/webhook",
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

app.use(json());

// app.use("/api", userRoutes);
// app.use("/api", categoryRoutes);
// app.use("/api", productRoutes);
// app.use("/api", paymentRoutes);
// app.use("/api", orderRoutes);
app.use(userRoutes);
app.use(categoryRoutes);
app.use(productRoutes);
app.use(paymentRoutes);
app.use(orderRoutes);

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
