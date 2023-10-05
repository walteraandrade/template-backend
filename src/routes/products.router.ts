import { Router } from "express"
import { httpParser } from "../middlewares/http-adapter.middleware"
import { generateCreateProductController } from "../factory/product/generate-create-product-controller.factory"
import { generateFindProductController } from "../factory/product/generate-find-product-controller.factory"

const router = Router()

router.get("/get-product", httpParser(generateFindProductController()))

router.post("/create-product", httpParser(generateCreateProductController()))

export const productRouter = router
