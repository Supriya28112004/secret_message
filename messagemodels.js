import mongoose from "mongoose";
const messageschema=new mongoose.Schema({
    name:{
    type:String,
    required:[true,"please enter the message"]}
});
const message=mongoose.model("message",messageschema);
export default message;