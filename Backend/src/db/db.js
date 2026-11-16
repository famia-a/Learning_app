const mongoose = require('mongoose')

async function connectDB(){
  try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Connected to DataBase");
}catch(err){
    console.log("DataBase Connection has an Issue", err)
}
   
} 
module.exports = connectDB