const formidable = require("formidable");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const ProductModel = require("../model/product.model");
const { validationResult } = require("express-validator");

class Product {
  // ******** create product with images  ***********

  async create(req, res) {
    // ******** using fromidable  *********
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (!err) {
        const parsedData = JSON.parse(fields.data);
        const errors = [];

        if (parsedData.title.trim().length === 0) {
          errors.push({ msg: "Title is required !" });
        }

        if (parseInt(parsedData.price) < 1) {
          errors.push({ msg: "Price should be above 1" });
        }

        if (parseInt(parsedData.discount) < 0) {
          errors.push({ msg: "Discoutn should be negative value !" });
        }

        if (parseInt(parsedData.stock) < 20) {
          errors.push({ msg: "Stock should be above 20" });
        }

        if (fields.description.trim().length === 0) {
          errors.push({ msg: "Description is required !" });
        }

        if (errors.length === 0) {
          if (!files["image1"]) {
            errors.push({ msg: "Image 1 is required !" });
          }
          if (!files["image2"]) {
            errors.push({ msg: "Image 2 is required !" });
          }
          if (!files["image3"]) {
            errors.push({ msg: "Image 3 is required !" });
          }

          if (errors.length === 0) {
            // *********   image file upload    ********

            const images = {};

            for (let i = 0; i < Object.keys(files).length; i++) {
              const mimeType = files[`image${i + 1}`].mimetype;

              const extension = mimeType.split("/")[1].toLowerCase();

              if (
                extension === "jpeg" ||
                extension === "jpg" ||
                extension === "png"
              ) {
                const imageName = uuidv4() + `.${extension}`;

                const __dirname = path.resolve();
                const newPath =
                  __dirname + `/../1_client/public/images/${imageName}`;

                images[`image${i + 1}`] = imageName;

                fs.copyFile(files[`image${i + 1}`].filepath, newPath, (err) => {
                  if (err) {
                    console.log(err);
                  }
                });
              } else {
                const error = {};

                error["msg"] = `image${i + 1} has invalid ${extension} type`;
                errors.push(error);
              }
            }

            // ****** images store on MongoDB   *******

            if (errors.length === 0) {
              try {
                const response = await ProductModel.create({
                  title: parsedData.title,
                  price: parseInt(parsedData.price),
                  discount: parseInt(parsedData.discount),
                  stock: parseInt(parsedData.stock),
                  category: parsedData.category,
                  colors: parsedData.colors,
                  sizes: JSON.parse(fields.sizes),
                  image1: images["image1"],
                  image2: images["image2"],
                  image3: images["image3"],
                  description: fields.description,
                });

                return res
                  .status(201)
                  .json({ msg: "Product created Successfully ! ", response });
              } catch (error) {
                console.log(error);

                res.status(500).json(error);
              }
            } else {
              return res.status(400).json({ errors });
            }
          } else {
            return res.status(400).json({ errors });
          }
        } else {
          res.status(400).json({ errors });
        }

        console.log("errors ", errors);
      } else {
        console.log(err);
      }
    });
  }

  // ********  update product without images   *********

  async updateProduct(req, res) {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      try {
        const {
          _id,
          title,
          price,
          discount,
          stock,
          colors,
          sizes,
          description,
          category,
        } = req.body;

        const response = await ProductModel.findByIdAndUpdate(
          _id,
          {
            $set: {
              title,
              price,
              discount,
              stock,
              colors,
              sizes,
              description,
              category,
            },
          },
          { new: true }
        );

        console.log("from backend UpdateProduct controller : ", response);
        return res
          .status(200)
          .json({ msg: "Product updated SUCCESSFULLY .", response });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ errors: error });
      }
    } else {
      return res.status(400).json({ errors: errors.array() });
    }
  }

  // ********  delete product  ********

  async deleteProduct(req, res) {
    const { id } = req.params;
    try {
      const selectedProduct = await ProductModel.findById(id);

      [1, 2, 3].forEach((number) => {
        let key = `image${number}`;
        let image = selectedProduct[key];
        let __dirname = path.resolve();
        let imagePath =
          __dirname + `/../client_e-com_oliver/public/images/${image}`;
        fs.unlink(imagePath, (err) => {
          if (err) {
            throw new Error(err);
          }
        });
      });

      await ProductModel.findByIdAndDelete(id);
      return res.status(200).json({
        msg: ` " ${selectedProduct.title} " has been deleted Successfully !  `,
      });
    } catch (error) {
      // console.log(error);
      // return res.status(500).json({ errors: error });
      throw new Error(error.message);
    }
  }

  // *********  get all products  ********

  async get(req, res) {
    const { page } = req.params;
    const perPage = 5;
    const skip = (page - 1) * perPage;
    try {
      const count = await ProductModel.find({}).countDocuments();
      const response = await ProductModel.find({})
        .skip(skip)
        .limit(perPage)
        .sort({ updatedAt: -1 });
      return res.status(200).json({ products: response, perPage, count });
    } catch (error) {
      console.log(error.message);
    }
  }

  // ********* get single product for updating   **********

  async getProduct(req, res) {
    const { id } = req.params;
    try {
      const product = await ProductModel.findById(id);

      res.status(200).json(product);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new Product();
