const express=require('express')

const routes=require('./route')

const cors = require('cors')

const mongoose=require('mongoose')

const cookieParser =require('cookie-parser')

const app=express();

app.use(cors({
    credentials:true,
    origin:['http://localhost:4200']
}));

app.use(cookieParser());



app.use(express.json())
app.use(routes);
mongoose.connect("mongodb://localhost:27017/angular")
 
.then(()=>{
    console.log("connected to database")
    app.listen(5000,()=>{
        console.log("App is listening on port 5000")
    })

})

