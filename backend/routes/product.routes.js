const router = require("express").Router();

const HomeProducts = require("../controllers/HomeProducts");
const Product = require("../controllers/Product");
const Authorization = require("../services/Authorization");
const productValidation = require("../validations/productValidation");

// ******  create product route   ******

router.post("/create-product", Authorization.authorized, Product.create);

// ******  get all products route   ******

router.get("/products/:page", Authorization.authorized, Product.get);

// ******  get single product for update route   ******

router.get("/product/:id", Product.getProduct);

// ******  update product route   ******

router.put(
  "/product",
  [Authorization.authorized, productValidation],
  Product.updateProduct
);

// ******  delete product route   ******

router.delete("/delete/:id", Authorization.authorized, Product.deleteProduct);

// *******  cat-products  route   ********
router.get("/cat-products/:name/:page?", HomeProducts.catProducts);

// ******* search-products route ********
router.get("/search-products/:keyword/:page?", HomeProducts.catProducts);

module.exports = router;
