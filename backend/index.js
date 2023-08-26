const express=  require("express");
const app = express();
const dotenv =require("dotenv").config();
const cors =require("cors");
const port = process.env.PORT||5000;
const router = require("./Routes/userRoute");
const {notfound,errorHandle} = require("./middlewares/Errorhandler");
const connectDb = require("./config/connectDb");
const prouter = require("./Routes/productRoute");
const itemRoute = require("./Routes/itemRoute");
const addRouter = require("./Routes/addressRoute");

//connet database
connectDb();

//middlewares
app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));
app.use("/api/user",router)
app.use("/api/product",prouter);
app.use("/api/item",itemRoute);
app.use("/api/address",addRouter);
app.use(notfound)
app.use(errorHandle)

app.listen(port,(err)=>{
    if(err) throw err
    console.log("this server is listening at port :- "+ port)
})