require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors()); 
app.use(express.json());
const dbConnection = require('./src/db/dbconnect');
dbConnection();

const userRouter = require('./src/router/user');
app.use('/api/v1', userRouter); 


app.get('/', (req, res)=>{
    res.status(200).json({
        message :'server is running',
        success:true
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
});
