import mongoose, { connections } from "mongoose"
import colors from "colors"
import { exit } from "node:process"

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.DATABASE_URL)
    const url = `${connection.host}:${connection.port}`
    console.log(colors.magenta(`MongoDB coonnected at ${url}`))
  } catch (error) {
    console.log(error.message)
    console.log(colors.red(`Error when connecting to MongoDB`))

    exit(1) // to stop excecution program
  }
}
