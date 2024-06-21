import server from "./server"
import colors from "colors"

const port = process.env.Port || 6000

server.listen(port, () => {
  console.log(colors.cyan.italic.bold(`Rest API working at port ${port}`))
})
