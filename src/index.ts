import express from "express"
import { logger } from "./logger"
import { userRouter } from "./routes/user.router"
import { productRouter } from "./routes/products.router"
const app = express()

app.use(express.json())
app.use("/user", userRouter)
app.use("/product", productRouter)

app.listen(3000, () => logger("Server running on port 3000"))
