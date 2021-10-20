const express = require("express");
const app = express();

const userRoute = require("./routes/user")

app.use(express.json())

app.use("/user",userRoute)

app.listen(5002,()=>{
    console.log('server connected at port 5002');
})