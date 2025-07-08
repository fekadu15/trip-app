const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const corsOption = {
    origin:["http://localhost:5173"]
};
app.use(cors(corsOption));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.get("/" , (req, res) => {
   
})
app.post("/signup" , ( req , res ) => {
    console.log(req.body);
})
app.listen(port , () => {
    console.log(`server is running on port ${port}`);
    
})
