const  express = require('express');

const cors= require('cors')
const {readdirSync} =  require('fs');
const { ConnectDB } = require('./Connection/ConnectMongoDB');

const app = express();
app.use(cors());
app.use(express.json());

require('dotenv').config();
const PORT=process.env.PORT || 5000;




readdirSync('./routers').map((router)=>app.use('/api',require('./routers/'+router)));
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(PORT, () =>{ 
    console.log(`Example app listening on port ${PORT}!`);
    ConnectDB();
});