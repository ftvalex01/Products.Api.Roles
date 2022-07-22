import mongoose from "mongoose";


mongoose.connect("mongodb://0.0.0.0/apiroles")
    .then(db=>console.log('db is connected'))
    .catch(err => console.log(err))