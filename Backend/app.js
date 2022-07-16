const express=require('express')
const app=express();
const cookieParser=require('cookie-parser')
const bodyparser=require('body-parser')
const fileUpload=require('express-fileupload')
const cors=require('cors')
const dotenv=require('dotenv')
const path=require('path')
app.use(express.json())
app.use(cookieParser()); 
app.use(bodyparser.urlencoded({extended:true}) )
app.use(fileUpload())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
//Setting up cloudinary

dotenv.config();
    const auth=require('./Routes/auth')
    const products=require('./routes/product')
    const order=require('./routes/order')
    const payment=require('./routes/payment')
    app.use('/api/v1',products)
    app.use('/api/v1',auth)
    app.use('/api/v1',order)
    app.use('/api/v1',payment)
    console.log(process.env.NODE_ENV)
    if (process.env.NODE_ENV === 'PRODUCTION') {
        app.use(express.static(path.join(__dirname, '../frontend/build')))
    
        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
        })
    }


module.exports=app;