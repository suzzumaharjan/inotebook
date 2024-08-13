const mongoose=require('mongoose');
const mongoURL="mongodb://localhost:27017/inotebook";
const connectToMongo = async () => {
    try {
      mongoose.set("strictQuery", false);
      mongoose.connect(mongoURL);
      console.log("Connected to Mongo Successfully!");
    } catch (error) {
      console.log(error);
    }
  };

module.exports=connectToMongo;