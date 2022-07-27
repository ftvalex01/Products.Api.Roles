import mongoose from "mongoose";


mongoose.connect("mongodb://0.0.0.0/apiroles",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
    .then(db=>console.log('db is connected'))
    .catch(err => console.log(err))