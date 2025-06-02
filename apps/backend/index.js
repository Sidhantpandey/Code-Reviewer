import express from "express"
import 'dotenv/config'
const app=express();
const port= process.env.PORT || 4000

app.get("/",(req,res)=>{
    res.send("Hello from the backend")
})

app.listen(port,()=>{
    console.log(`Server Listening at Port ${port}`)
})