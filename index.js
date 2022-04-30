import 'dotenv/config'
import express from "express";
import sns from "./routes/sns"

const port = 3000
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (_req, res) => {
	res.json({ "hello": "world" })
})

app.use('/api', sns );

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
