const express=require('express')
const app=express()
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;

const URL=require('./models/url')
const {connectToMongoDb}=require('./connect')

connectToMongoDb('mongodb+srv://adityamhatre2003:W17T8aRZgo0yfG3E@urlshortner.mbhqj.mongodb.net/short-url?retryWrites=true&w=majority'
).then(
    console.log('Mongo connected successfully')
)
app.use(express.json())
const cors=require('cors');
const PORT=8001;



const urlRoute=require('./routes/url')
app.use(cors);
app.use("/url",urlRoute)

app.get("/:shortId",async (req,res)=> {
    const shortId=req.params.shortId
    const urlentry=await URL.findOneAndUpdate(
        {shortId},

        {$push:{visitHistory:{timestamp:Date.now()}}},
        { new: true }
       
    )
     console.log(`${urlentry}`)
   return res.redirect(urlentry.redirectURL);
    
})


app.listen(PORT,()=>console.log(`Server started at : ${PORT}`))