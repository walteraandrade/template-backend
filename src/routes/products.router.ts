import { Router } from "express"
import { httpParser } from "../middlewares/http-adapter.middleware"
import { generateFindUserController } from "../factory/user/generate-user-controller.factory"
import { generateCreateProductController } from "../factory/product/generate-create-product-controller.factory"

const router = Router()

router.get("/get-product", httpParser(generateFindUserController()))

router.post("/create-product", httpParser(generateCreateProductController()))

export const productRouter = router
