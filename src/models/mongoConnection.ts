import mongoose from "mongoose";
import config from "../configs/config";

mongoose.connection.once('open',()=>{
    console.log('MongoDB connection is ready')
})

export async function mongoConnect (){
    try{
        await mongoose.connect(config.mongoUri)
    }catch(err){
        console.error(err)
        throw err
    }
}

mongoose.connection.on('error', err => {
  console.error(err);
});