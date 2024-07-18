import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileRoutes from './routes/fileRoutes';
const port = 3001;
let corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app = express();



app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api/files',fileRoutes);

app.get("/", (req, res) => res.send("Express on Vercel"));


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})