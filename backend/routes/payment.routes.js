const express = require("express");
const router = require("express").Router();

require("dotenv").config();

const PaymentController = require("../controllers/PaymentController");
const Authorization = require("../services/Authorization");

router.post(
  "/create-checkout-session",
  Authorization.authorized,
  PaymentController.paymentProcess
);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  PaymentController.checkOutSession
);

router.get(
  "/verify-payment/:id",
  Authorization.authorized,
  PaymentController.paymentVerify
);

module.exports = router;
