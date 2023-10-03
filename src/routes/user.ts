import * as express from "express"
import {
  handleCreateUser,
  handleGetUser,
  handleUpdateUserEmail,
} from "../controllers/user.controller"

const router = express.Router()

router.get("/get-user", (req, res) => {
  handleGetUser(req, res)
})

router.post("/create-user", (req, res) => {
  handleCreateUser(req, res)
})

router.post("/update-user-email", (req, res) => {
  handleUpdateUserEmail(req, res)
})

export const userRouter = router
