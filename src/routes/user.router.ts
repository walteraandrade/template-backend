import { Router } from "express"
import { httpParser } from "../middlewares/http-adapter.middleware"
import { generateFindUserController } from "../factory/generate-user-controller.factory"
import { generateCreateUserController } from "../factory/generate-create-user-controller.factory"
import { generateChangeUserEmailController } from "../factory/user/generate-change-user-email-controller.factory"

const router = Router()

router.get("/get-user", httpParser(generateFindUserController()))

router.post("/create-user", httpParser(generateCreateUserController()))

router.post(
  "/update-user-email",
  httpParser(generateChangeUserEmailController())
)

export const userRouter = router
