 import express from "express";
 import z from "zod";
 import dotenv from "dotenv";
 import message from "./messagemodels.js";
 import connectDB from "./configdb.js";
 dotenv.config();
 connectDB();
 const app=express();
 app.use(express.json())

// app.get("/",(req,res)=> {
//    res.send(
//         "Welcome to secret message!"
//     );
// });

const msgschema=z.object({
message:z.string().min(3).max(150)
  });

 let messages = [
  { id: 1, message: "Hello" },
  { id: 2, message: "Hi" }
];

 app.get("/message",(req,res)=>
 {
     res.status(200).json(messages);
 });
 app.get("/message/:id",(req,res)=>
 {
    const id=parseInt(req.params.id,10);
    if(id<0 || id>=messages.length)
    {
        return res.status(404).json({success:false,message:"message not found"});
    }
    const message=messages[id];
    res.status(200).json({success:true,data:message});
});


app.post("/message",(req,res)=>
{
    const message=req.body.message;
    const validatemessage=msgschema.safeParse(req.body);
    console.log(validatemessage?.error);
    messages.push(message);
    res.status(200).json({ response:"Successfully added your message"});
    console.log(messages);
    
 });


app.put("/message/:id",(req,res)=>
{
    const id=parseInt(req.params.id,10);
    if(id<0 || id>=messages.length)
    {
        return res.status(404).json({success:false,message:"message is not  updated"});
    }
    const { message }=req.body;
    if(!message)
    {
       return res.status(404).json({success:false,message:"message is  not updated successfully"});
    }
     messages[id]=message;
     {
        return res.status(201).json({success:true,message:"message is updated successfully"});
     }


 });


 app.delete("/message/:id",(req,res)=>
{
    const id=parseInt(req.params.id,10);
    if(id<0 ||id>=messages.length)
    {
        return res.status(404).json({success:false, message:"not deleted"});
    }
    const message=messages.splice(id,1);
    return res.status(200).json({success:true,message:"deleted message"});
});




 app.listen(5000,()=>
{
    console.log("Listening to port");
});


// import express from "express";
// import dotenv from "dotenv";
// import z from "zod";
// import connectDB from "./configdb.js"; // ✅ Your DB config file
// import messageModel from "./messagemodels.js"; // Optional if using DB instead of in-memory

// dotenv.config();
// connectDB();

// const app = express();
// app.use(express.json());

// // In-memory message store (replace with MongoDB later)
// let messages = [
//   { id: 1, message: "Hello" },
//   { id: 2, message: "Hi" }
// ];
// let nextId = 3;

// // Zod validation schema
// const msgschema = z.object({
//   message: z.string().min(3).max(150)
// });

// // Home
// app.get("/", (req, res) => {
//   res.json("Welcome to secret message!");
// });

// // GET all messages
// app.get("/message", (req, res) => {
//   res.status(200).json(messages);
// });

// // GET message by ID
// app.get("/message/:id", (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   const msg = messages.find(m => m.id === id);

//   if (!msg) {
//     return res.status(404).json({ success: false, message: "Message not found" });
//   }

//   res.status(200).json({ success: true, data: msg });
// });

// // POST message
// app.post("/message", (req, res) => {
//   const validation = msgschema.safeParse(req.body);

//   if (!validation.success) {
//     return res.status(400).json({ success: false, error: validation.error.errors });
//   }

//   const newMessage = {
//     id: nextId++,
//     message: req.body.message
//   };

//   messages.push(newMessage);
//   res.status(200).json({ success: true, data: newMessage });
// });

// // PUT update message by ID
// app.put("/message/:id", (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   const { message } = req.body;

//   const msg = messages.find(m => m.id === id);
//   if (!msg) {
//     return res.status(404).json({ success: false, message: "Message not found" });
//   }

//   if (!message || message.length < 3) {
//     return res.status(400).json({ success: false, message: "Invalid message" });
//   }

//   msg.message = message;
//   res.status(200).json({ success: true, message: "Message updated", data: msg });
// });

// // DELETE message by ID
// app.delete("/message/:id", (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   const index = messages.findIndex(m => m.id === id);

//   if (index === -1) {
//     return res.status(404).json({ success: false, message: "Message not found" });
//   }

//   const deleted = messages.splice(index, 1);
//   res.status(200).json({ success: true, message: "Message deleted", deleted: deleted[0] });
// });

// // Debug route (optional)
// app.get("/debug", (req, res) => {
//   res.json(messages);
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
