const express=require("express")
const cors=require("cors")
const {connection}=require("./config/db")
const router=require("./routes/contact")
const msgrouter=require("./routes/message")
const querryrouter=require("./routes/querry")


const app=express()
app.use(cors())

app.use(express.json())
app.use(router)
app.use(msgrouter)
app.use(querryrouter)


app.listen(8080,async()=>{
    try {
        await connection
        console.log("connected to db");
    } catch (error) {
        console.log(error);
    }
    console.log("server is running on port 8080");
})