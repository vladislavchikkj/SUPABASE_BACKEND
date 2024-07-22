import bodyParser from 'body-parser'
import cors from 'cors'
import express, { Request, Response } from 'express'
import fileRoutes from './routes/fileRoutes'
import folderRoutes from './routes/folderRoutes'
const port = 3001

let corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app = express()

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use('/api/folders', folderRoutes)
app.use('/api/files', fileRoutes)

app.get('/api/', (req: Request, res: Response) => {
	res.send('default root path')
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
