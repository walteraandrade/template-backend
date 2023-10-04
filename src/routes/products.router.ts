import * as express from "express"
import {
  handleCreateProduct,
  handleGetProduct,
} from "../controllers/product.controller"

const router = express.Router()

router.get("/get-product", (req, res) => {
  handleGetProduct(req, res)
})

router.post("/create-product", (req, res) => {
  handleCreateProduct(req, res)
})

export const productRouter = router
