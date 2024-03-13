const mongoose = require('mongoose')

const connectionString = process.env.connectionString
mongoose.connect(connectionString).then((res)=>{
    console.log("Shoplify Server  Connected succesffuly with MongoDb");
}).catch((err)=>{
    console.log(err);
})