import * as express from "express"
import {
  handleCreateUser,
  handleGetUser,
  handleUpdateUserEmail,
} from "../controllers/user.controller"
import { httpParser } from "../middlewares/http-adapter.middleware"
import { createGetUserController } from "../factory/get-user-controller.factory"

const router = express.Router()

router.get("/get-user", httpParser(createGetUserController()))

router.post("/create-user", (req, res) => {
  handleCreateUser(req, res)
})

router.post("/update-user-email", (req, res) => {
  handleUpdateUserEmail(req, res)
})

export const userRouter = router
