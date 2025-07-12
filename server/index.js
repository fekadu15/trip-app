const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
 require( "dotenv").config();
const port = 5000;
const {Pool}= require("pg");
const cors = require("cors");
const bcrypt = require("bcrypt");
const corsOption = {
    origin: ["http://localhost:5173"]
};
app.use(cors(corsOption));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
    user:process.env.DB_USER,
    database:process.env.DB_DATABASE,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    port:process.env.DB_PORT
});

app.get("/" , (req, res) => {
   res.send("app is running here !");
})

app.post("/signup" , async ( req , res ) => {
    const { password , confirm, first_name ,last_name ,email}  = req.body
  
  let isvalid = true;
  
  if (!email || !email.includes('@')) {
  isvalid = false;
}

if (!first_name || first_name.trim() === '') {
  isvalid = false;
}

if (password.length < 6) {
  isvalid = false;
}

if (!isvalid){
   return res.status(400).json({    message : "invalid email or names or password"});
}

    if (password === confirm){
    try {

const hashed_password =  await bcrypt.hash(password,10);
   const result = await pool.query 
   (`insert into users(f_name , l_name , email , password ) values ($1, $2 , $3 , $4)
    RETURNING id, f_name, l_name, email`,
    [first_name , last_name , email , hashed_password]
   )
 res.status (201) .json ({
    message : "user registered susseccfully",
   user : result.rows[0]
 })

}
  catch (err) {
    console.log(err)
       res.status(500).send("error registering a user !") ; 
    }

    } 
else {
    res.status(400).send(" passwords do not match!");
}

})

app.post("/login" ,  async (req, res ) => {

const {password , email} = req.body; 
   try {
    const result = await pool.query("select * from users where email = $1",[email]);
     if(result.rows[0].length === 0){
     return   res.status(400).json({    message: "unknown email" })
     }
     
        user = result.rows[0];
    const hashed_password = user.password;
    const ismatch =  await bcrypt.compare(password , hashed_password);

  if(!ismatch){
   return res.status(400).json({ message: "invalid password"});
  }
 
  const token = jwt.sign(
      {
        id:user.id,
        email:user.email
      },
      process.env.JWT_SECRET,
        { expiresIn: "1h" }
     );

     res.json({
        message:" login successful",
        token : token
     })   
   }
   catch (err) {
  console.log(err)
    res.status(500).send (" internal server error");

   }
})
app.post("/")
app.listen(port , () => {
    console.log(`server is running on port ${port}`);
    
})
