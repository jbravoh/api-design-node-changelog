import { Router } from "express";
import { body } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";
import { handleInputErrors } from "./modules/middleware";

const router = Router();

/**
 * Product
 */

router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);
router.post(
  "/product",
  body("name").exists().isString(),
  handleInputErrors,
  createProduct
);

router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct
);
router.delete("/product/:id", deleteProduct);

/**
 * Update
 */

router.get("/update", () => {});
router.get("/update/:id", () => {});
router.post(
  "/update",
  body("title").exists().isString(),
  body("description").exists,
  handleInputErrors,
  () => {}
);
router.put(
  "/update/:id",
  body("title").optional().isString(),
  body("description").optional().isString(),
  // validate enum
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
  body("version").optional(),
  handleInputErrors,
  () => {}
);
router.delete("/update/:id", () => {});

/**
 * Update Point
 */

router.get("/updatepoint", (req, res) => {
  res.json({ message: "hello" });
});
router.get("/updatepoint/:id", () => {});
router.post(
  "/updatepoint",
  body("name").exists().isString(),
  body("description").exists().isString(),
  handleInputErrors,
  () => {}
);
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  handleInputErrors,
  () => {}
);
router.delete("/updatepoint/:id", () => {});

export default router;
