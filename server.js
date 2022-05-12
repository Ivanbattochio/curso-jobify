import express from "express"
import dotenv from "dotenv"
dotenv.config()

import "express-async-errors"
import morgan from "morgan"
//db and authenticateUser
import connectDB from "./db/connect.js"

//routers
import authRoutes from "./routes/authRoutes.js"
import jobsRoutes from "./routes/jobsRoutes.js"
import authenticateUser from "./middleware/auth.js"
//middleware
import notFoundMiddleware from "./middleware/not-found.js"
import errorHandlerMiddleware from "./middleware/error-handler.js"

const app = express()
const port = process.env.PORT || 4000

if (process.env.NODE_ENV !== "production") {
	app.use(morgan("dev"))
}

app.use(express.json())

app.get("/", (req, res) => {
	res.json({ msg: "welcome" })
})

app.get("/api/v1", (req, res) => {
	res.json({ msg: "welcome" })
})

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/jobs", authenticateUser, jobsRoutes)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URL)
		app.listen(port, () => {
			console.log("listening on " + port)
		})
	} catch (error) {
		console.log(error)
	}
}

start()
